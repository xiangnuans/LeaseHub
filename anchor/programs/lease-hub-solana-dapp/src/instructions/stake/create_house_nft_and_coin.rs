use anchor_lang::prelude::*;

use crate::state::*;
use anchor_spl::{
    token::{Transfer,mint_to, Mint, MintTo, Token, TokenAccount,transfer}, 
    associated_token::AssociatedToken,
      metadata::{
        create_master_edition_v3, 
       CreateMasterEditionV3, sign_metadata, SignMetadata
    },   
};
use mpl_token_metadata::{
    types::{DataV2, Creator},
      
};
use crate::error::ErrorCode;
use crate::utils::{
    create_metadata_accounts_v3, CreateMetadataAccountsV3cpi, Metadata,
};

pub fn create_house_nft_and_coin(ctx: Context<CreateHouseNftAndCoin>, args: NFTargs) -> Result<()> {
     
    let nft_manager = &mut ctx.accounts.nft_manager;
    nft_manager.nft_mint = ctx.accounts.nft_mint.key() ;
    nft_manager.coin_mint = ctx.accounts.coin_mint.key();
    nft_manager.nft_authority = ctx.accounts.nft_authority.key();
    let rewards_pool_info = &mut ctx.accounts.rewards_pool_info;
    nft_manager.total_coins = args.total_coins;
    nft_manager.coins_price = args.coins_price;
    nft_manager.swap_coins = ctx.accounts.swap_coins.key();
    nft_manager.swap_sols = ctx.accounts.swap_sols.key(); 
    nft_manager.nft_minted = true;
    // Mint one NFT to the program
    let cpi_accounts = MintTo {
        mint: ctx.accounts.nft_mint.to_account_info(),
        to: ctx.accounts.nft_manager.to_account_info(),
        authority: ctx.accounts.nft_authority.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let binding = ctx.accounts.nft_mint.key();
    let seeds = &[b"NFT_authority", binding.as_ref()];
    let signer = &[&seeds[..]];
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
    mint_to(cpi_ctx, 1)?;

    // Update the NFT manager state
    

    let metadata_cpi_accounts = CreateMetadataAccountsV3cpi {
        metadata: ctx.accounts.metadata.to_account_info(),
               mint: ctx.accounts.nft_mint.to_account_info(),
               mint_authority: ctx.accounts.nft_authority.to_account_info(), // use pda mint address as mint authority
               update_authority: ctx.accounts.nft_authority.to_account_info(), // use pda mint as update authority
               payer: ctx.accounts.authority.to_account_info(),
               system_program: ctx.accounts.system_program.to_account_info(),
               //rent: ctx.accounts.rent.to_account_info(),        // Rent sysvar
    };
    let metadata_cpi_ctx = CpiContext::new(
       ctx.accounts.token_metadata_program.to_account_info(), // Token metadata program
       metadata_cpi_accounts,
   );
    
    // let cpi_program = ctx.accounts.token_metadata_program.to_account_info();
    // let seeds = &[b"NFT_authority", ctx.accounts.nft_mint.key().as_ref()];
    // let signer = &[&seeds[..]];
    // let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    
    let data_v2 = DataV2 {
            collection: None,
            creators: Some(vec![
                Creator {
                    address: ctx.accounts.authority.key(),
                    verified: false,
                    share: 100,
                }
            ]),    // List of creators
            seller_fee_basis_points: 0, // Seller fee in basis points
            name: args.name.clone(),        // NFT name
            symbol: args.symbol.clone(),    // NFT symbol
            uri: args.uri.clone(),    // URI for the NFT metadata
            uses: None,                 // Optional use details
    };


    let is_mutable = true;
    let update_authority_is_signer = true;
    let collection_details = None;

    create_metadata_accounts_v3(metadata_cpi_ctx, data_v2, is_mutable, update_authority_is_signer, collection_details)?;

    // Sign the metadata using the NFT authority (PDA)
    let cpi_accounts = SignMetadata {
        metadata: ctx.accounts.metadata.to_account_info(),
        creator: ctx.accounts.authority.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_metadata_program.to_account_info();
    let binding = ctx.accounts.nft_mint.key();
    let seeds = &[b"NFT_authority", binding.as_ref()];
    let signer = &[&seeds[..]];
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
    sign_metadata(cpi_ctx)?;
    

    // Mint the maximum supply of tokens to the house owner
    let cpi_accounts = MintTo {
        mint: ctx.accounts.coin_mint.to_account_info(),
        to: ctx.accounts.house_owner_token_account.to_account_info(),
        authority: ctx.accounts.nft_authority.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let binding = ctx.accounts.nft_mint.key();

    let seeds = &[b"NFT_authority", binding.as_ref()];
    let signer = &[&seeds[..]];
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
    mint_to(cpi_ctx, args.total_coins)?;
    
    rewards_pool_info.last_update_time = Clock::get()?.unix_timestamp as u64;
    rewards_pool_info.reward_per_token_store = 0;
    Ok(())
}

pub fn buy_share_token(ctx: Context<BuyShareToken>, amount: u64) -> Result<()> {
    let nft_manager = &mut ctx.accounts.nft_manager;
    let user = &mut ctx.accounts.user;
    let user_share_account = &mut ctx.accounts.user_share_account;
    let swap_coins = &mut ctx.accounts.swap_coins;
    let swap_sols = &mut ctx.accounts.swap_sols;

    // Calculate SOL amount based on coin price
    let sol_amount = amount.checked_mul(nft_manager.coins_price).ok_or(ErrorCode::CalculationError)?;

    // Check if user has enough SOL
    if user.lamports() < sol_amount {
        return Err(ErrorCode::InsufficientSol.into());
    }

    // Check if swap_coins has enough tokens
    if swap_coins.amount < amount {
        return Err(ErrorCode::InsufficientTokens.into());
    }

    // Transfer SOL from user to swap_sols
    **user.try_borrow_mut_lamports()? -= sol_amount;
    **swap_sols.try_borrow_mut_lamports()? += sol_amount;

    // Update the user's share account
    user_share_account.sol_amount += sol_amount;

    // Update the NFT manager state
    nft_manager.unlock_sol += sol_amount;


    Ok(())
}


pub fn sell_share_token(ctx: Context<SellShareToken>, amount:u64) -> Result<()> {
    let house_owner_token_account = &mut ctx.accounts.house_owner_token_account;
    let house_owner = &ctx.accounts.house_owner;
    
    let nft_manager = &mut ctx.accounts.nft_manager;
    let user_stake = &mut ctx.accounts.user_stake;
    let rewards_pool_info = &mut ctx.accounts.rewards_pool_info;

    let user_share_account = &mut ctx.accounts.usershare_account;
    if amount > house_owner_token_account.amount {
        return Err(ErrorCode::InsufficientTokens.into());
    }


    let current_time = Clock::get()?.unix_timestamp as u64;
    
    let time_elapsed = current_time - rewards_pool_info.last_update_time;
    
    
    rewards_pool_info.reward_per_token_store += (rewards_pool_info.reward_rate * time_elapsed as u64) / (nft_manager.total_coins-nft_manager.unlock_share_token);
    rewards_pool_info.last_update_time = current_time;
    if house_owner_token_account.key() != Pubkey::default() {
        user_stake.reward_tally += house_owner_token_account.amount * (rewards_pool_info.reward_per_token_store - user_stake.reward_per_token_paid) / 1e9 as u64;
        user_stake.reward_per_token_paid = rewards_pool_info.reward_per_token_store;
    }

    // Transfer tokens from house_owner_token_account to swap_coins
    let cpi_accounts = Transfer {
        from: house_owner_token_account.to_account_info(),
        to: ctx.accounts.swap_coins.to_account_info(),
        authority: house_owner.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    transfer(cpi_ctx, amount)?;

    // Update the user's share account
    user_share_account.share_token_amount += amount;

    // Emit an event or log for the token sale
    msg!("Sold {} share tokens to swap_coins", amount);

    // Update the NFT manager state
    nft_manager.unlock_share_token += amount;

    Ok(())
}

pub fn withdraw(ctx: Context<Withdraw>, amount: u64, withdraw_sol: bool) -> Result<()> {
    let user_share_account = &mut ctx.accounts.user_share_account;
    let nft_manager = &mut ctx.accounts.nft_manager;
    let user_stake = &mut ctx.accounts.user_stake;
    let rewards_pool_info = &mut ctx.accounts.rewards_pool_info;
    let user_token_account = &mut ctx.accounts.user_token_account;
    if withdraw_sol {
        // Withdraw SOL
        if amount*nft_manager.coins_price > user_share_account.sol_amount {
            return Err(ErrorCode::InsufficientBalance.into());
        }
        // Check if swap_sols has enough balance
        if ctx.accounts.swap_sols.lamports() < amount * nft_manager.coins_price {
            return Err(ErrorCode::InsufficientSwapSolBalance.into());
        }
        // Transfer SOL from swap_sols to user
        **ctx.accounts.swap_sols.try_borrow_mut_lamports()? -= amount*nft_manager.coins_price;
        **ctx.accounts.user.try_borrow_mut_lamports()? += amount*nft_manager.coins_price;

        // Update user's share account and NFT manager
        user_share_account.sol_amount -= amount*nft_manager.coins_price;
        nft_manager.unlock_sol -= amount*nft_manager.coins_price;
    } else {
        // Withdraw share tokens
 
        if amount > user_share_account.share_token_amount {
            return Err(ErrorCode::InsufficientTokens.into());
        }

        if ctx.accounts.swap_coins.amount < amount {
            return Err(ErrorCode::InsufficientSwapSolBalance.into());
        }
        // update_reward(ctx.accounts.nft_manager, ctx.accounts.user_stake)?;
        let current_time = Clock::get()?.unix_timestamp as u64;
    
        let time_elapsed = current_time - rewards_pool_info.last_update_time;
        
        
        rewards_pool_info.reward_per_token_store += (rewards_pool_info.reward_rate * time_elapsed) / (nft_manager.total_coins-nft_manager.unlock_share_token);
        rewards_pool_info.last_update_time = current_time;
        if user_token_account.key() != Pubkey::default() {
            user_stake.reward_tally += user_token_account.amount * (rewards_pool_info.reward_per_token_store - user_stake.reward_per_token_paid) / 1e9 as u64;
            user_stake.reward_per_token_paid = rewards_pool_info.reward_per_token_store;
        }
        // Transfer tokens from swap_coins to user's token account
        let cpi_accounts = Transfer {
            from: ctx.accounts.swap_coins.to_account_info(),
            to: ctx.accounts.user_token_account.to_account_info(),
            authority: ctx.accounts.nft_authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let seeds = &[
            b"NFT_authority",
            ctx.accounts.nft_authority.to_account_info().key.as_ref(),
        ];
        let signer = &[&seeds[..]];
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
        transfer(cpi_ctx, amount)?;

        // Update user's share account and NFT manager
        user_share_account.share_token_amount -= amount;
        nft_manager.unlock_share_token -= amount;
    }

    msg!("Withdrawn {} {}", amount, if withdraw_sol { "SOL" } else { "share tokens" });

    Ok(())
}


