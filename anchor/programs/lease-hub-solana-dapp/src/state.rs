use anchor_lang::prelude::*;
use anchor_spl::{
    token::{mint_to, Mint, MintTo, Token, TokenAccount},
    metadata::{
        create_metadata_accounts_v3,
        mpl_token_metadata::types::DataV2,
        CreateMetadataAccountsV3,
        sign_metadata,
        SignMetadata,
    },
    associated_token::AssociatedToken
};


#[account]
pub struct RoomOrder {
    pub start_time: u64,
    pub end_time: u64,
    pub days: u64,
    pub nonce: u64,
    pub paid_rewards: u64,
    pub price: u64,
    pub validator: Pubkey,
    pub validator_signature: String,
    pub creator: Pubkey,
    pub status: u8,
    pub payer: Pubkey,
    pub bytes: String,
    pub signature: String,
}


#[account]
pub struct NFTmanager {
    //nft mint
    pub nft_mint: Pubkey,
    //house coin mint
    pub coin_mint: Pubkey,
    //rewards mint
    pub rewards_mint: Pubkey,
    //nft authority control house coin and nft
    pub nft_authority: Pubkey,
    //total supply of house coins
    pub total_coins: u64,
    //house coins price(for trade with sol)
    pub coins_price: u64,
    //rent price (paid by rewards coin)
    pub rent_price: u64,
    // swap pool vault
    pub swap_coins: Pubkey,
    // swap pool sols vault
    pub swap_sols: Pubkey,
    // rentfees rewards(devide by house coin owner)
    pub rent_rewards: Pubkey,
    // mint sign
    pub nft_minted: bool,
    //rewards pool info for devide rewards
    pub rewards_pool_info: Pubkey,
    //swap pool house coin for trade
    pub unlock_share_token: u64,
    //swap pool sols for trade
    pub unlock_sol: u64,
    //nonce for room order
    pub nonce: u64,
    //bump
    pub bump: u8,
}


#[account]
pub struct User_ledge {
    pub owner: Pubkey,
    pub share_token_amount: u64,
    pub sol_amount: u64,
}


#[account]
pub struct Rewards_pool_info {
    
    pub epche_finish:u64,
    pub last_update_time: u64,
    pub reward_per_token_store: u64,
    pub reward_rate: u64,
    pub bump: u8,
    
}


#[account]
pub struct Pool {
    pub reward_mint: Pubkey,
    pub bump:u8,
    pub reward_authority: Pubkey,
    pub reward_per_slot: u64,
    pub last_update_slot: u64,
    pub acc_reward_per_share: u128,
}

#[account]
pub struct User {
    pub amount: u64,
    pub reward_debt: u64,
}


#[account]
pub struct UserStake {
    pub owner: Pubkey,
    pub reward_tally: u64,
    pub reward_per_token_paid: u64,
}



