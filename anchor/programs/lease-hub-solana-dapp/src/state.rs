use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct StakePool {
    pub authority: Pubkey,
    pub total_staked: u64,
    pub staker_count: u64,
    pub created_at: i64,
}
