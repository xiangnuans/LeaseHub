use anchor_lang::prelude::*;
use crate::state::*;

use anchor_spl::{
    token::{Token, TokenAccount, Transfer, transfer},
};
use crate::error::ErrorCode;
use crate::constants::*;


pub fn create_room_order_and_paid(ctx: Context<CreateRoomOrderAndPaid>) -> Result<()> {
    
    let nft_manager = &mut ctx.accounts.nft_manager;
    let room_order = &mut ctx.accounts.room_order;
    let rent_rewards = &mut ctx.accounts.rent_rewards;
    //订单号自增
    nft_manager.nonce +=1;
    if room_order.start_time > room_order.end_time{
        return Err(ErrorCode::InvalidTimeRange.into());
    }

    let rewards_amount = nft_manager.rent_price * room_order.days;
    if rewards_amount != room_order.paid_rewards{
        return Err(ErrorCode::InvalidPaymentAmount.into());
    }   

    // Initialize the room order
    let cpi_accounts = Transfer {
        from: ctx.accounts.user_token_account.to_account_info(),
        to: rent_rewards.to_account_info(),
        authority: ctx.accounts.user.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    transfer(cpi_ctx, rewards_amount)?;

    // 更新 room_order 状态
    room_order.status = 2;
    room_order.payer = ctx.accounts.user.key();

    Ok(())
}


pub fn create_room_order_to_sell(ctx: Context<RoomOrderToSell>) -> Result<()> {
    let room_order = &mut ctx.accounts.room_order;
    let user = &ctx.accounts.user;
    let nft_manager = &mut ctx.accounts.nft_manager;
    nft_manager.nonce +=1;

    room_order.status = 1;  //1 表示订单状态为预售 2 是已支付 3 是取消 4 结束
    room_order.creator = user.key();
    Ok(())
}

pub fn pay_for_existing_order(ctx: Context<PayForExistingOrder>) -> Result<()> {
    let nft_manager = &mut ctx.accounts.nft_manager;
    let room_order = &mut ctx.accounts.room_order;

    // Check if the order is in the correct state to be paid
    if room_order.status != 1 {
        return Err(ErrorCode::InvalidOrderStatus.into());
    }

    // Calculate the required payment amount
    let rewards_amount = nft_manager.rent_price * room_order.days;
    if rewards_amount != room_order.paid_rewards {
        return Err(ErrorCode::InvalidPaymentAmount.into());
    }

    // Transfer the payment
    let cpi_accounts = Transfer {
        from: ctx.accounts.user_token_account.to_account_info(),
        to: ctx.accounts.rent_rewards.to_account_info(),
        authority: ctx.accounts.user.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    transfer(cpi_ctx, rewards_amount)?;

    // Update the room_order status
    room_order.status = 2;
    room_order.payer = ctx.accounts.user.key();

    Ok(())
}

pub fn cancel_order(ctx: Context<CancelOrder>) -> Result<()> {
    let room_order = &mut ctx.accounts.room_order;
    let nft_manager = &ctx.accounts.nft_manager;
    
    // Check if the order is in a state that can be cancelled (status 1 or 2)
    if room_order.status != 1 && room_order.status != 2 {
        return Err(ErrorCode::InvalidOrderStatus.into());
    }

    // Only the creator or payer can cancel the order
    if ctx.accounts.user.key() != room_order.payer {
        return Err(ErrorCode::UnauthorizedCancellation.into());
    }

    // If the order has been paid for, refund the payment
    if room_order.status == 2 {
        let rewards_amount = room_order.paid_rewards;

        // Transfer the refund from rent_rewards to user_token_account
        let cpi_accounts = Transfer {
            from: ctx.accounts.rent_rewards.to_account_info(),
            to: ctx.accounts.user_token_account.to_account_info(),
            authority: ctx.accounts.nft_authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let binding = ctx.accounts.nft_manager.key();
        let seeds = &[
            b"NFT_authority",
            binding.as_ref(),
        ];
        let signer = &[&seeds[..]];
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
        transfer(cpi_ctx, rewards_amount)?;
    }

    // Update the room_order status to cancelled
    room_order.status = 3;

    Ok(())
}

pub fn finish_order(ctx: Context<FinishOrder>) -> Result<()> {
    let room_order = &mut ctx.accounts.room_order;
    let nft_manager = &mut ctx.accounts.nft_manager;
    let rewards_pool_info = &mut ctx.accounts.rewards_pool_info;
    let user_stake = &mut ctx.accounts.user_stake;
    let user_token_account = &ctx.accounts.user_token_account;
    // Check if the order is in a state that can be finished (status 2)
    if room_order.status != 2 {
        return Err(ErrorCode::InvalidOrderStatus.into());
    }

    // Only the validator can finish the order
    if ctx.accounts.validator.key() != room_order.validator {
        return Err(ErrorCode::UnauthorizedFinish.into());
    }

    // Update the room_order status to finished
    room_order.status = 4;

    let rewards = room_order.paid_rewards;
    
    // update_reward(rewards_pool_info, Pubkey::default())?;  
    let current_time = Clock::get()?.unix_timestamp as u64;
    let time_elapsed = current_time - rewards_pool_info.last_update_time;
    rewards_pool_info.reward_per_token_store += (rewards_pool_info.reward_rate * time_elapsed as u64) / (nft_manager.total_coins-nft_manager.unlock_share_token);
    rewards_pool_info.last_update_time = current_time;
    if user_stake.key() != Pubkey::default() {
        user_stake.reward_tally += user_token_account.amount * (rewards_pool_info.reward_per_token_store - user_stake.reward_per_token_paid) / 1e9 as u64;
        user_stake.reward_per_token_paid = rewards_pool_info.reward_per_token_store;
    }

    if current_time > rewards_pool_info.epche_finish {
        rewards_pool_info.reward_rate = rewards / REWARD_DURATION as u64;

    } else{
        let remaining = rewards_pool_info.epche_finish - current_time;
        let leftover = remaining * rewards_pool_info.reward_rate;
        rewards_pool_info.reward_rate = rewards.checked_add(leftover).unwrap().checked_div(REWARD_DURATION as u64).unwrap();
    }

    rewards_pool_info.last_update_time = current_time;  
    rewards_pool_info.epche_finish = current_time + REWARD_DURATION;
    msg!("Notification: New Rewards has accived");
    // notification(rewards_pool_info, amount);
    // Transfer the price from user_token_account to swap_coins
    Ok(())
}

