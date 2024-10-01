#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("4P76KAJyhNTBvV1iTFv9hAnJ8vmcUHWQaBDoDLAGLYjX");

#[program]
pub mod lease_hub_solana_dapp {
    use super::*;

  pub fn close(_ctx: Context<CloseLeaseHubSolanaDapp>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.lease_hub_solana_dapp.count = ctx.accounts.lease_hub_solana_dapp.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.lease_hub_solana_dapp.count = ctx.accounts.lease_hub_solana_dapp.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeLeaseHubSolanaDapp>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.lease_hub_solana_dapp.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeLeaseHubSolanaDapp<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + LeaseHubSolanaDapp::INIT_SPACE,
  payer = payer
  )]
  pub lease_hub_solana_dapp: Account<'info, LeaseHubSolanaDapp>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseLeaseHubSolanaDapp<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub lease_hub_solana_dapp: Account<'info, LeaseHubSolanaDapp>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub lease_hub_solana_dapp: Account<'info, LeaseHubSolanaDapp>,
}

#[account]
#[derive(InitSpace)]
pub struct LeaseHubSolanaDapp {
  count: u8,
}
