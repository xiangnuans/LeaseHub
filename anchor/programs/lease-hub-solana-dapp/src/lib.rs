#![allow(clippy::result_large_err)]
pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;
pub mod utils;

use anchor_lang::prelude::*;
pub use constants::*;
pub use state::*;
pub use utils::*;
// use crate::state::
use instructions::stake::*;

declare_id!("4P76KAJyhNTBvV1iTFv9hAnJ8vmcUHWQaBDoDLAGLYjX");

#[program]
pub mod lease_hub_solana_dapp {
    use super::*;
    
    /// create_house_nft_and_coin
    pub fn create_house_nft_and_coin(ctx: Context<CreateHouseNftAndCoin>, args: NFTargs) -> Result<()>{
        create_house_nft_and_coin::create_house_nft_and_coin(ctx, args)
    }
    pub fn buy_share_token(ctx: Context<BuyShareToken>, amount: u64) -> Result<()>{
        create_house_nft_and_coin::buy_share_token(ctx,amount)
    }
    pub fn sell_share_token(ctx: Context<SellShareToken>, amount: u64) -> Result<()>{
        create_house_nft_and_coin::sell_share_token(ctx,amount)
    }
    pub fn withdraw(ctx: Context<Withdraw>, amount: u64, withdraw_sol: bool) -> Result<()>{
        create_house_nft_and_coin::withdraw(ctx,amount,withdraw_sol)
    }

    /// create order
    pub fn create_room_order_and_paid(ctx: Context<CreateRoomOrderAndPaid>) -> Result<()> {
        create_order::create_room_order_and_paid(ctx)
    }

    pub fn create_room_order_to_sell(ctx: Context<RoomOrderToSell>) -> Result<()> {
        create_order::create_room_order_to_sell(ctx)
    }

    pub fn pay_for_existing_order(ctx: Context<PayForExistingOrder>) -> Result<()> {
        create_order::pay_for_existing_order(ctx)
    }   
    
    pub fn cancel_order(ctx: Context<CancelOrder>) -> Result<()> {
        create_order::cancel_order(ctx)
    }

    pub fn finish_order(ctx: Context<FinishOrder>) -> Result<()> {
        create_order::finish_order(ctx)
    }
    
    ///create rewards coins

    ///create stake coins
    pub fn create_stake_coin(ctx: Context<CreateStakeCoin>) -> Result<()> {
        create_stake_coins::create_stake_coin(ctx)
    }

    pub fn stakecoin(ctx: Context<MintToken>,amount: u64) -> Result<()> {
        create_stake_coins::stake(ctx,amount)
    }

    pub fn unstakecoin(ctx: Context<BurnToken>,amount: u64) -> Result<()> {
        create_stake_coins::unstake(ctx,amount)
    }

    ///masterchef
    pub fn initialize(ctx: Context<Initialize>, reward_per_slot: u64) -> Result<()> {
        masterchef::initialize(ctx, reward_per_slot)
    }

    pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
        masterchef::stake(ctx, amount)
    }

    pub fn unstake(ctx: Context<Unstake>, amount: u64) -> Result<()> {  
        masterchef::unstake(ctx, amount)
    }

    pub fn pending_reward(ctx: Context<PendingReward>) -> Result<()> {
        masterchef::pending_reward(ctx)
    }   
    pub fn claim_reward_masterchef(ctx: Context<ClaimRewardMasterchef>) -> Result<()> {
        masterchef::claim_reward_masterchef(ctx)
    }   

    ///yfi get rent rewards
    // pub fn notification(
    //     rewards_pool_info: &mut Account<Rewards_pool_info>,
    //     rewards: u64,
    // ) -> Result<()> {
    //     yfi_get_rent_rewards::notification(rewards_pool_info,rewards)
    // }

    pub fn claim_reward_yfi(ctx: Context<ClaimRewardYfi>) -> Result<()> {
        yfi_get_rent_rewards::claim_reward_yfi(ctx)
    }   
    





}
