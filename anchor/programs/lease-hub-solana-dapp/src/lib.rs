#![allow(clippy::result_large_err)]
pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;
//pub mod utils;

use anchor_lang::prelude::*;
pub use constants::*;
use instructions::*;

declare_id!("4P76KAJyhNTBvV1iTFv9hAnJ8vmcUHWQaBDoDLAGLYjX");

#[program]
pub mod lease_hub_solana_dapp {
    use super::*;
    pub fn create_stake_pool(ctx: Context<CreateStakePool>) -> Result<()> {
        create_stake_pool::create_stake_pool(ctx)
    }
}
