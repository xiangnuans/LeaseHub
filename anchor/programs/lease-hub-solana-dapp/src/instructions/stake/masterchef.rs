use anchor_lang::prelude::*;
use crate::state::*;
use anchor_spl::{
    associated_token::AssociatedToken,

    token::{self,Mint,MintTo,Token, TokenAccount, Transfer},
};


pub fn initialize(ctx: Context<Initialize>, reward_per_slot: u64) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    pool.bump = ctx.bumps.pool;  // to do 
    pool.reward_mint = ctx.accounts.reward_mint.key();
    pool.reward_authority = ctx.accounts.reward_authority.key();
    pool.reward_per_slot = reward_per_slot;
    pool.last_update_slot = Clock::get()?.slot;
    pool.acc_reward_per_share = 0;
    
    Ok(())
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    //pool account
    #[account(init, payer = user, space = 8 + 32 + 32 + 32 + 8 + 8 + 8 + 16 + 1,seeds=[b"pool_authority"],bump)]
    pub pool: Account<'info, Pool>,

    //rewards mint
    #[account(mut, mint::authority = reward_authority)]
    pub reward_mint: Account<'info, Mint>,  //奖励代币的mint
    
    //pda of program reward key
    #[account(
        seeds = [b"reward_authority", pool.key().as_ref()],
        bump,
    )]
    pub reward_authority: UncheckedAccount<'info>, //奖励代币的authority 是程序的pda账户

    #[account(mut)]
    pub user: Signer<'info>,
    pub token_program:AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}


pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
    
    if amount == 0 {
        return Ok(());
    }

    let pool = &mut ctx.accounts.pool;
    let user = &mut ctx.accounts.user;

    // Update pool rewards
    update_pool(pool)?; 
    
    

    // Update user rewards
    user.reward_debt = user.reward_debt.wrapping_add(
        (amount as u128)
            .checked_mul(pool.acc_reward_per_share)
            .unwrap()
            .checked_div(1e9 as u128)
            .unwrap() as u64
    );

    **ctx.accounts.user_authority.to_account_info().try_borrow_mut_lamports()? -= amount;
    **ctx.accounts.pool.to_account_info().try_borrow_mut_lamports()? += amount;

    // Update user stake
    user.amount = user.amount.checked_add(amount).unwrap();
    // pool.total_staked = pool.total_staked.checked_add(amount).unwrap();

    Ok(())
}
   
#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct Stake<'info> {
    #[account(mut)]
    pub pool: Account<'info, Pool>,
    #[account(init_if_needed, 
        payer = user_authority, 
        space = 8 + 32 + 32 + 8 + 8,
        seeds = [b"user", user_authority.key().as_ref()],
        bump,
    )]
    pub user: Account<'info, User>,
    
    #[account(mut)]
    pub user_authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}


pub fn unstake(ctx: Context<Unstake>, amount: u64) -> Result<()> {
    
    if amount == 0 {
        return Ok(());
    }

    let pool = &mut ctx.accounts.pool;
    let user = &mut ctx.accounts.user;

    // Update pool rewards
    update_pool(pool)?;

    // Calculate rewards
    let pending_reward = ((user.amount as u128)
        .checked_mul(pool.acc_reward_per_share)
        .unwrap()
        .checked_div(1e9 as u128)
        .unwrap() as u64)
        .checked_sub(user.reward_debt)
        .unwrap();

    // Transfer staked tokens back to user
    // let pool_seeds = &[pool.pool_authority.as_ref()];
    
    // let pool_signer = &[&pool_seeds[..]];

    let reward_seeds = &[pool.reward_authority.as_ref()];
    let reward_signer = &[&reward_seeds[..]];

    // Transfer rewards to user
    let cpi_accounts = MintTo {
        mint: ctx.accounts.reward_mint.to_account_info(),
        to: ctx.accounts.user_reward_account.to_account_info(),
        authority: ctx.accounts.reward_authority.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, reward_signer);
    token::mint_to(cpi_ctx, pending_reward)?;

    // Update user state
    user.amount = user.amount.checked_sub(amount).unwrap();
    user.reward_debt = ((user.amount as u128)
        .checked_mul(pool.acc_reward_per_share)
        .unwrap()
        .checked_div(1e9 as u128)
        .unwrap()) as u64;

    **ctx.accounts.pool.to_account_info().try_borrow_mut_lamports()? -= amount;
    **ctx.accounts.user_authority.to_account_info().try_borrow_mut_lamports()? += amount;
    // Update pool state
    // pool.total_staked = pool.total_staked.checked_sub(amount).unwrap();

    Ok(())
}

#[derive(Accounts)]
pub struct Unstake<'info> {
    #[account(mut)]
    pub pool: Account<'info, Pool>,
    #[account(mut)]
    pub user: Account<'info, User>,
    // forward init
    #[account(mut, constraint = user_reward_account.owner == user_authority.key(),
                    constraint = user_reward_account.mint == reward_mint.key()
    )]
    pub user_reward_account: Account<'info, TokenAccount>,

    #[account(constraint = reward_mint.key() == pool.reward_mint)]
    pub reward_mint: Account<'info, Mint>,

    pub user_authority: Signer<'info>,
    /// CHECK: This is the PDA that signs for the pool
    
    #[account(
        seeds = [b"reward_authority", pool.key().as_ref()],
        bump,
    )]
    pub reward_authority: UncheckedAccount<'info>,
    pub token_program: Program<'info, Token>,
    pub associated_program: Program<'info, AssociatedToken>,
}



// pub fn pending_reward(ctx: Context<PendingReward>) -> Result<()> {
//     let pool = &ctx.accounts.pool;
//     let user = &ctx.accounts.user;

//     let rewards = ((user.amount as u128)
//         .checked_mul(pool.acc_reward_per_share)
//         .unwrap()
//         .checked_div(1e9 as u128)
//         .unwrap() as u64)
//         .checked_sub(user.reward_debt)
//         .unwrap();
        
//     emit!(Rewardmasterchef {
//         user: user.key(),
//         amount: rewards,
//     });
//     Ok(())
// }
// #[event]
// pub struct Rewardmasterchef {
//     #[index]
//     pub user: Pubkey,
//     pub amount: u64,
// }

// #[derive(Accounts)]
// pub struct PendingReward<'info> {
//     pub pool: Account<'info, Pool>,
//     pub user: Account<'info, User>,
// }


pub fn claim_reward_masterchef(ctx: Context<ClaimRewardMasterchef>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let user = &mut ctx.accounts.user;

    // Update pool rewards
    update_pool(pool)?;

    // Calculate rewards
    let pending_reward = ((user.amount as u128)
        .checked_mul(pool.acc_reward_per_share)
        .unwrap()
        .checked_div(1e9 as u128)
        .unwrap() as u64)
        .checked_sub(user.reward_debt)
        .unwrap();

    if pending_reward == 0 {
        return Ok(());
    }
    

    // Transfer rewards to user
    let seeds = &[pool.reward_authority.as_ref()];
    let signer = &[&seeds[..]];
    let cpi_accounts = MintTo {
        mint: ctx.accounts.reward_mint.to_account_info(),
        to: ctx.accounts.user_reward_account.to_account_info(),
        authority: ctx.accounts.reward_authority.to_account_info(),
    };


    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
    token::mint_to(cpi_ctx, pending_reward)?;

    // Update user state
    user.reward_debt = (user.amount as u128)
        .checked_mul(pool.acc_reward_per_share)
        .unwrap()
        .checked_div(1e9 as u128)
        .unwrap() as u64;

    Ok(())
}

#[derive(Accounts)]
pub struct ClaimRewardMasterchef<'info> {
    #[account(mut)]
    pub pool: Account<'info, Pool>,
    #[account(mut, mint::authority = pool.reward_authority)]
    pub reward_mint: Account<'info, Mint>,
    #[account(mut, owner = user_authority.key())]
    pub user: Account<'info, User>,
    #[account(mut,constraint = user_reward_account.owner == user_authority.key(),
                constraint = user_reward_account.mint == pool.reward_mint
    )]
    pub user_reward_account: Account<'info, TokenAccount>,

    pub user_authority: Signer<'info>,
    #[account(
        seeds = [b"reward_authority", pool.key().as_ref()],
        bump,
    )]
    pub reward_authority: UncheckedAccount<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

fn update_pool(pool: &mut Account<Pool>) -> Result<()> {
    // 获取当前时间槽
    let current_slot = Clock::get()?.slot;
    
    // 如果当前时间槽小于或等于上次更新时间槽，无需更新
    if current_slot <= pool.last_update_slot {
        return Ok(());
    }
    let total_staked = pool.to_account_info().lamports();
    // 只有在总质押量不为零时才进行更新
    if total_staked != 0 {
        // 计算经过的时间槽数
        let slots_elapsed = current_slot - pool.last_update_slot;
        
        // 计算这段时间内应该产生的奖励
        let reward = (slots_elapsed as u128)
            .checked_mul(pool.reward_per_slot as u128)
            .unwrap();
        
        // 更新每份质押的累计奖励
        pool.acc_reward_per_share = pool.acc_reward_per_share
            .checked_add(
                reward
                    .checked_mul(1e9 as u128)  // 乘以1e9以增加精度
                    .unwrap()
                    .checked_div(total_staked as u128)  // 除以总质押量
                    .unwrap()
            )
            .unwrap();
    }
    
    // 更新最后更新时间槽
    pool.last_update_slot = current_slot;
    Ok(())
}





