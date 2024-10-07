use anchor_lang::prelude::*;
use crate::state::*;
use anchor_spl::{
    token::{self,MintTo,Token, TokenAccount, Transfer},
};


pub fn initialize(ctx: Context<Initialize>, reward_per_slot: u64) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    pool.reward_mint = ctx.accounts.reward_mint.key();
    pool.staking_mint = ctx.accounts.staking_mint.key();
    pool.reward_authority = ctx.accounts.reward_authority.key();
    pool.stake_authority = ctx.accounts.stake_authority.key();
    pool.total_staked = 0;
    pool.reward_per_slot = reward_per_slot;
    pool.last_update_slot = Clock::get()?.slot;
    pool.acc_reward_per_share = 0;
    
    Ok(())
}


pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
    
    if amount == 0 {
        return Ok(());
    }

    let pool = &mut ctx.accounts.pool;
    let user = &mut ctx.accounts.user;

    // Update pool rewards
    update_pool(pool)?; 
    
    // Transfer tokens to stake
    let cpi_accounts = Transfer {
        from: ctx.accounts.user_staking_account.to_account_info(),
        to: ctx.accounts.pool_staking_account.to_account_info(),
        authority: ctx.accounts.user_authority.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::transfer(cpi_ctx, amount)?;

    // Update user rewards
    user.reward_debt = user.reward_debt.wrapping_add(
        (amount as u128)
            .checked_mul(pool.acc_reward_per_share)
            .unwrap()
            .checked_div(1e9 as u128)
            .unwrap() as u64
    );

    // Update user stake
    user.amount = user.amount.checked_add(amount).unwrap();
    pool.total_staked = pool.total_staked.checked_add(amount).unwrap();

    Ok(())
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
    let stake_seeds = &[pool.stake_authority.as_ref()];
    let reward_seeds = &[pool.reward_authority.as_ref()];
    let stake_signer = &[&stake_seeds[..]];
    let reward_signer = &[&reward_seeds[..]];
    let cpi_accounts = Transfer {
        from: ctx.accounts.pool_staking_account.to_account_info(),
        to: ctx.accounts.user_staking_account.to_account_info(),
        authority: ctx.accounts.stake_authority.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, stake_signer);
    token::transfer(cpi_ctx, amount)?;

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

    // Update pool state
    pool.total_staked = pool.total_staked.checked_sub(amount).unwrap();

    Ok(())
}

pub fn pending_reward(ctx: Context<PendingReward>) -> Result<()> {
    let pool = &ctx.accounts.pool;
    let user = &ctx.accounts.user;

    let rewards = ((user.amount as u128)
        .checked_mul(pool.acc_reward_per_share)
        .unwrap()
        .checked_div(1e9 as u128)
        .unwrap() as u64)
        .checked_sub(user.reward_debt)
        .unwrap();
        
    emit!(Rewardmasterchef {
        user: user.key(),
        amount: rewards,
    });
    Ok(())
}
#[event]
pub struct Rewardmasterchef {
    #[index]
    pub user: Pubkey,
    pub amount: u64,
}



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


fn update_pool(pool: &mut Account<Pool>) -> Result<()> {
    // 获取当前时间槽
    let current_slot = Clock::get()?.slot;
    
    // 如果当前时间槽小于或等于上次更新时间槽，无需更新
    if current_slot <= pool.last_update_slot {
        return Ok(());
    }

    // 只有在总质押量不为零时才进行更新
    if pool.total_staked != 0 {
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
                    .checked_div(pool.total_staked as u128)  // 除以总质押量
                    .unwrap()
            )
            .unwrap();
    }
    
    // 更新最后更新时间槽
    pool.last_update_slot = current_slot;
    Ok(())
}





