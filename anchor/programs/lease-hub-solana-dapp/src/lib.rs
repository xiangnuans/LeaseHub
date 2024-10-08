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
use instructions::stake::{
    create_house_nft_and_coin::*,
    create_order::*,
    create_rewards_coin::*,
    masterchef::*,
    yfi_get_rent_rewards::*,    
};

declare_id!("4P76KAJyhNTBvV1iTFv9hAnJ8vmcUHWQaBDoDLAGLYjX");

#[program]
pub mod lease_hub_solana_dapp {
    use super::*;
    
    /// create_house_nft_and_coin
    pub fn InitHouseManager(ctx: Context<InitHouseManager>, total_coins: u64, coins_price: u64) -> Result<()>{
        init_house_manager(ctx, total_coins, coins_price)
    }


    pub fn create_house_nft_and_coin(ctx: Context<CreateHouseNftAndCoin>, args: NFTinfo_args) -> Result<()>{
        create_house_nft_and_coin(ctx, args)
    }

    pub fn mint_house_to_owner(ctx: Context<MintHouseToOwner>) -> Result<()>{
        mint_house_to_owner(ctx)
    }

    pub fn buy_share_token(ctx: Context<BuyShareToken>, amount: u64) -> Result<()>{
        buy_share_token(ctx,amount)
    }
    pub fn sell_share_token(ctx: Context<SellShareToken>, amount: u64) -> Result<()>{
        sell_share_token(ctx,amount)
    }
    pub fn withdraw(ctx: Context<Withdraw>, amount: u64, withdraw_sol: bool) -> Result<()>{
        withdraw(ctx,amount,withdraw_sol)
    }

    /// create order
    pub fn create_room_order_and_paid(ctx: Context<CreateRoomOrderAndPaid>) -> Result<()> {
        create_room_order_and_paid(ctx)
    }

    pub fn create_room_order_to_sell(ctx: Context<RoomOrderToSell>) -> Result<()> {
        create_room_order_to_sell(ctx)
    }

    pub fn pay_for_existing_order(ctx: Context<PayForExistingOrder>) -> Result<()> {
        pay_for_existing_order(ctx)
    }   
    
    pub fn cancel_order(ctx: Context<CancelOrder>) -> Result<()> {
        cancel_order(ctx)
    }

    pub fn finish_order(ctx: Context<FinishOrder>) -> Result<()> {
        finish_order(ctx)
    }
    
    ///create rewards coins


    ///masterchef
    pub fn initialize(ctx: Context<Initialize>, reward_per_slot: u64) -> Result<()> {
        initialize(ctx, reward_per_slot)
    }

    pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
        stake(ctx, amount)
    }

    pub fn unstake(ctx: Context<Unstake>, amount: u64) -> Result<()> {  
        unstake(ctx, amount)
    }

    // pub fn pending_reward(ctx: Context<PendingReward>) -> Result<()> {
    //     pending_reward(ctx)
    // }   
    pub fn claim_reward_masterchef(ctx: Context<ClaimRewardMasterchef>) -> Result<()> {
        claim_reward_masterchef(ctx)
    }   

    ///yfi get rent rewards
    // pub fn notification(
    //     rewards_pool_info: &mut Account<Rewards_pool_info>,
    //     rewards: u64,
    // ) -> Result<()> {
    //     yfi_get_rent_rewards::notification(rewards_pool_info,rewards)
    // }

    pub fn claim_reward_yfi(ctx: Context<ClaimRewardYfi>) -> Result<()> {
        claim_reward_yfi(ctx)
    }   
    





}
