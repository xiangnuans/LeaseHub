use anchor_lang::prelude::*;
use crate::state::*;
use anchor_spl::token::{self,Transfer,Mint, Token, TokenAccount};

   
use crate::state::{NFTmanager, Rewards_pool_info};
use crate::constants::REWARD_DURATION;

// pub fn notification(
//     rewards_pool_info: &mut Account<Rewards_pool_info>,
//     rewards: u64,
// ) -> Result<()> {
    
//     update_reward(rewards_pool_info, Pubkey::default())?;  
//     let current_time = Clock::get()?.unix_timestamp;
//     if current_time > rewards_pool_info.epche_finish {
//         rewards_pool_info.reward_rate = rewards / REWARD_DURATION as u64;

//     } else{
//         let remaining = rewards_pool_info.epche_finish - current_time;
//         let leftover = remaining * rewards_pool_info.reward_rate;
//         rewards_pool_info.reward_rate = rewards.add(leftover).div(REWARD_DURATION as u64);
//     }

//     rewards_pool_info.last_update_time = current_time;  
//     rewards_pool_info.epche_finish = current_time + REWARD_DURATION;
//     msg!("Notification: New Rewards has accived");
//     Ok(())
// }

pub fn earned(ctx: Context<Earned>) -> Result<()> {
    let current_time = Clock::get()?.unix_timestamp as u64;
    let rewards_pool_info = &mut ctx.accounts.rewards_pool_info;
    let nft_manager = &mut ctx.accounts.nft_manager;
    let user_stake = &mut ctx.accounts.user_stake;
    let user_reward_account = &mut ctx.accounts.user_reward_account;

    let time_elapsed = current_time - rewards_pool_info.last_update_time;
    let reward_per_token = rewards_pool_info.reward_per_token_store + (rewards_pool_info.reward_rate * time_elapsed as u64) / (nft_manager.total_coins - nft_manager.unlock_share_token);
    let rewards = user_stake.reward_tally + user_reward_account.amount * (reward_per_token - user_stake.reward_per_token_paid) / 1e9 as u64;
    
    emit!(RewardPaid {
        user: user_reward_account.key(),
        amount: rewards,
    });
    Ok(())
}

#[derive(Accounts)]
pub struct Earned<'info> {
    #[account(mut)]
    pub nft_manager: Account<'info, NFTmanager>,
    #[account(mut,constraint = rewards_pool_info.key() == nft_manager.rewards_pool_info)]
    pub rewards_pool_info: Account<'info, Rewards_pool_info>,
    #[account(mut)]
    pub user_stake: Account<'info, UserStake>,
    #[account(mut,
        associated_token::mint = nft_manager.rewards_mint,
        associated_token::authority = user
    )]
    pub user_reward_account: Account<'info, TokenAccount>,
    pub associated_token_program: AccountInfo<'info>,

    pub user: Signer<'info>,
}

#[event]
pub struct RewardPaid {
    #[index]
    pub user: Pubkey,
    pub amount: u64,
}


// pub fn update_reward(rewards_pool_info: Rewards_pool_info , user: UserStake) -> Result<()> {
//     let current_time = Clock::get()?.unix_timestamp;
    
//     let time_elapsed = current_time - rewards_pool_info.last_update_time;
//     let pool = rewards_pool_info;
    
//     pool.reward_per_token_store += (pool.reward_rate * time_elapsed as u64) / (nft_manager.total_coins-nft_manager.unlock_share_token);
//     pool.last_update_time = current_time;
//     if user.key() != Pubkey::default() {
//         user.reward_tally += user.amount * (pool.reward_per_token_store - user.reward_per_token_paid) / 1e9 as u64;
//         user.reward_per_token_paid = pool.reward_per_token_store;
//     }

//     Ok(())
// }


pub fn claim_reward_yfi(ctx: Context<ClaimRewardYfi>) -> Result<()> {
    let nft_manager = &mut ctx.accounts.nft_manager;
    let user_stake = &mut ctx.accounts.user_stake;
    let rewards_pool_info = &mut ctx.accounts.rewards_pool_info;
    let user_token_account = &mut ctx.accounts.user_token_account;
    // 更新奖励
    // update_reward(ctx.accounts.rewards_pool_info, ctx.accounts.user_stake)?;


    let current_time = Clock::get()?.unix_timestamp as u64;
    let time_elapsed = current_time - rewards_pool_info.last_update_time;
    rewards_pool_info.reward_per_token_store += (rewards_pool_info.reward_rate * time_elapsed) / (nft_manager.total_coins-nft_manager.unlock_share_token);
    rewards_pool_info.last_update_time = current_time;
    if user_stake.key() != Pubkey::default() {
        user_stake.reward_tally += user_token_account.amount * (rewards_pool_info.reward_per_token_store - user_stake.reward_per_token_paid) / 1e9 as u64;
        user_stake.reward_per_token_paid = rewards_pool_info.reward_per_token_store;
    }
    // 计算可领取的奖励
    let reward = user_stake.reward_tally;

    // 转移奖励代币给用户
    let cpi_accounts = Transfer {
        from: ctx.accounts.rent_rewards.to_account_info(),
        to: ctx.accounts.user_reward_account.to_account_info(),
        authority: ctx.accounts.nft_authority.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let binding = ctx.accounts.nft_manager.key();
    let seeds = &[b"NFT_authority", binding.as_ref()];
    let signer = &[&seeds[..]];
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
    token::transfer(cpi_ctx, reward as u64)?;

    // 重置用户奖励计数
    user_stake.reward_tally = 0;

    Ok(())
}


#[derive(Accounts)]
pub struct ClaimRewardYfi<'info> {
    #[account(mut)]
    pub nft_manager: Account<'info, NFTmanager>,

    #[account(init_if_needed,
        payer = user,
        space = 8 + 8 + 8,
        seeds = [b"user_stake", user.key().as_ref()],
        constraint = user_stake.owner == user.key(),
        bump,
    )]
    pub user_stake: Account<'info, UserStake>,
    
    #[account(mut,
        associated_token::mint = nft_manager.rewards_mint,
        associated_token::authority = nft_authority
    )]
    pub rent_rewards: Account<'info, TokenAccount>,

    #[account(mut,constraint = rewards_pool_info.key() == nft_manager.rewards_pool_info)]
    pub rewards_pool_info: Account<'info, Rewards_pool_info>,
    
    #[account(mut,
        associated_token::mint = nft_manager.coin_mint,
        associated_token::authority = user
    )]
    pub user_token_account: Account<'info, TokenAccount>,
    
    #[account(seeds = [b"NFT_authority", nft_manager.key().as_ref()], bump)  ]
    /// CHECK: This is a PDA used as authority
    pub nft_authority: AccountInfo<'info>,

    #[account(mut,
        associated_token::mint = nft_manager.rewards_mint,
        associated_token::authority = user
    )]
    pub user_reward_account: Account<'info, TokenAccount>,

    #[account(mut)] 
    pub user: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}


