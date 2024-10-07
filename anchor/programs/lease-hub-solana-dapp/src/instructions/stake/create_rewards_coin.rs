use anchor_lang::prelude::*;

use anchor_spl::{
    token::{Mint, Token},
};
use crate::state::*;
pub fn create_rewards_coin(ctx: Context<CreateRewardsCoin>) -> Result<()> {
    Ok(())
}   

#[derive(Accounts)]
pub struct CreateRewardsCoin<'info> {
    #[account(init, 
        payer = authority,
        mint::decimals = 9,
        mint::authority = mint_authority.key(),
    )]
    pub mint: Account<'info, Mint>,

    #[account(seeds = [b"reward_authority", mint.key().as_ref()], bump)]
    /// CHECK: This is a PDA used as mint authority
    pub mint_authority: UncheckedAccount<'info>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}




