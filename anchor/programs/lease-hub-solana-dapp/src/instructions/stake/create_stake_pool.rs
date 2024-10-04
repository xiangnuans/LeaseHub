use anchor_lang::prelude::*;

use crate::{state::StakePool, DISCRIMINATOR_SIZE};

pub fn create_stake_pool(ctx: Context<CreateStakePool>) -> Result<()> {
    let stake_pool = &mut ctx.accounts.stake_pool;
    let authority = &ctx.accounts.authority;

    stake_pool.authority = authority.key();
    stake_pool.total_staked = 0;
    stake_pool.staker_count = 0;
    stake_pool.created_at = Clock::get()?.unix_timestamp;

    msg!("质押池已创建");
    Ok(())
}

#[derive(Accounts)]
pub struct CreateStakePool<'info> {
    #[account(init, payer = authority,
      space = DISCRIMINATOR_SIZE + StakePool::INIT_SPACE)]
    pub stake_pool: Account<'info, StakePool>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
