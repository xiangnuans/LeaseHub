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




#[derive(Accounts)]
pub struct CreateStakeCoin<'info> {
    #[account(init, 
        payer = authority,
        mint::decimals = 9,
        mint::authority = mint_authority.key(),
    )]
    pub mint: Account<'info, Mint>,

    #[account(seeds = [b"stake_authority", mint.key().as_ref()], bump)]
    /// CHECK: This is a PDA used as mint authority
    pub mint_authority: UncheckedAccount<'info>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct MintToken<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = owner
    )]
    pub token_account: Account<'info, TokenAccount>,

    #[account(seeds = [b"mint_authority"], bump)]
    /// CHECK: This is a PDA used as mint authority
    pub mint_authority: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: This account is used to stake SOL 金库地址 pool
    pub stake_account: UncheckedAccount<'info>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct BurnToken<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = owner
    )]
    pub token_account: Account<'info, TokenAccount>,

    #[account(seeds = [b"stake_authority", mint.key().as_ref()], bump)]
    /// CHECK: This is a PDA used as mint authority
    pub mint_authority: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: This account is used to store staked SOL  金库合约
    pub stake_account: UncheckedAccount<'info>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
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

#[derive(Accounts)]
pub struct FinishOrder<'info> {
    #[account(mut)]
    pub nft_manager: Account<'info, NFTmanager>,


    #[account(
        mut,
        seeds = [b"room_order", room_order.nonce.to_le_bytes().as_ref()],
        bump,
        constraint = room_order.status == 2
    )]
    pub room_order: Account<'info, RoomOrder>,

    #[account(mut,constraint = rewards_pool_info.key() == nft_manager.rewards_pool_info)]
    pub rewards_pool_info: Account<'info, Rewards_pool_info>,

    #[account(
        mut,
        associated_token::mint = nft_manager.rewards_mint,
        associated_token::authority = room_order.payer,
    )]
    pub user_token_account: Account<'info, TokenAccount>, 

    #[account(constraint = validator.key() == room_order.validator)]
    pub validator: Signer<'info>,
    ///todo
    #[account(mut,constraint = user_stake.owner == room_order.payer,)]
    pub user_stake: Account<'info, UserStake>,
}


#[derive(Accounts)]
pub struct CancelOrder<'info> {
    #[account(mut)]
    pub nft_manager: Account<'info, NFTmanager>,

    #[account(
        mut,
        seeds = [b"room_order", room_order.nonce.to_le_bytes().as_ref()],
        bump,
        constraint = room_order.status == 1 || room_order.status == 2
    )]
    pub room_order: Account<'info, RoomOrder>,

    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        associated_token::mint = nft_manager.rewards_mint,
        associated_token::authority = user
    )]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = rent_rewards.key() == nft_manager.rent_rewards
    )]
    pub rent_rewards: Account<'info, TokenAccount>,

    #[account(seeds = [b"NFT_authority", nft_manager.key().as_ref()], bump)]
    /// CHECK: This is a PDA used as authority
    pub nft_authority: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
pub struct PayForExistingOrder<'info> {
    #[account(mut)]
    pub nft_manager: Account<'info, NFTmanager>,

    #[account(
        mut,
        seeds = [b"room_order", room_order.nonce.to_le_bytes().as_ref()],
        bump,
        constraint = room_order.status == 1
    )]
    pub room_order: Account<'info, RoomOrder>,

    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        associated_token::mint = nft_manager.rewards_mint,
        associated_token::authority = user
    )]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = rent_rewards.key() == nft_manager.rent_rewards
    )]
    pub rent_rewards: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
pub struct CreateRoomOrderAndPaid<'info> {
    
    #[account(mut)]
    pub nft_manager: Account<'info, NFTmanager>,
    #[account(
        init,
        payer = user,
        space = 8 + 8 + 8 + 32 + 1 + 32, // discriminator + nonce + rewards + creator + paid + payer
        constraint = nft_manager.nonce == room_order.nonce,
        seeds = [b"room_order", nft_manager.nonce.to_le_bytes().as_ref()],
        bump
    )]
    pub room_order: Account<'info, RoomOrder>,

    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        associated_token::mint = reward_mint,
        associated_token::authority = user
    )]
    pub user_token_account: Account<'info, TokenAccount>,

    pub reward_mint: Account<'info, Mint>,
    #[account(
        mut,
        constraint = rent_rewards.key() == nft_manager.rent_rewards
    )]
    pub rent_rewards: Account<'info, TokenAccount>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct RoomOrderToSell<'info> {
    #[account(mut)]
    pub nft_manager: Account<'info, NFTmanager>,
    #[account(
        init,
        payer = user,
        space = 8 + 8 + 8 + 8 + 8 + 8 + 32 + 1 + 32 + 4 + 4, // discriminator + start_time + end_time + days + nonce + paid_rewards + price + creator + status + payer + bytes + signature
        constraint = nft_manager.nonce == room_order.nonce,
        seeds = [b"room_order", nft_manager.nonce.to_le_bytes().as_ref()],
        bump
    )]
    pub room_order: Account<'info, RoomOrder>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

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

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut, constraint = user_share_account.owner == user.key())]
    pub user_share_account: Account<'info, User_ledge>,

    #[account(mut)]
    pub nft_manager: Account<'info, NFTmanager>,

    #[account(init_if_needed,
        payer = user,
        space = 8 + 8 + 8,
        constraint = user_stake.owner == user.key(),
    )]
    pub user_stake: Account<'info, UserStake>,

    #[account(mut, seeds = [b"swap_sols", nft_authority.key().as_ref()], bump,constraint = nft_manager.swap_sols == swap_sols.key())]
    pub swap_sols: UncheckedAccount<'info>,

    #[account(mut, associated_token::mint = nft_manager.coin_mint, associated_token::authority = nft_authority)]
    pub swap_coins: Account<'info, TokenAccount>,

    #[account(
        mut,
        associated_token::mint = nft_manager.coin_mint,
        associated_token::authority = user
    )]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(seeds = [b"NFT_authority", nft_manager.key().as_ref()], bump)]
    /// CHECK: This is a PDA used as authority
    pub nft_authority: UncheckedAccount<'info>,
    #[account(mut, constraint = rewards_pool_info.key() == nft_manager.rewards_pool_info)]
    pub rewards_pool_info: Account<'info, Rewards_pool_info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateHouseNftAndCoin<'info> {
    
    #[account(init, payer = authority, space = 8 + 32 + 32 + 32 + 8 + 8 + 32 + 32)]
    pub nft_manager: Account<'info, NFTmanager>,
    
    #[account(init, payer = authority, space = 8 + 8 + 8,
                seeds = [b"rewards_pool_info", nft_authority.key().as_ref()],
                bump)]
    pub rewards_pool_info: Account<'info, Rewards_pool_info>,

    #[account(init, 
        payer = authority,
        mint::decimals = 0,
        mint::authority = nft_authority.key(),
    )]
    pub nft_mint: Account<'info, Mint>,

    #[account(init, 
        payer = authority,
        mint::decimals = 9,
        mint::authority = nft_authority.key(),
    )]
    pub coin_mint: Account<'info, Mint>,

    #[account(seeds = [b"NFT_authority", nft_manager.key().as_ref()], bump)]
    /// CHECK: This is a PDA used as mint authority
    pub nft_authority: UncheckedAccount<'info>,

    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(init_if_needed,
        payer = authority,
        associated_token::mint = rewards_mint,
        associated_token::authority = nft_authority
    )]
    pub rent_rewards: Account<'info, TokenAccount>,

    #[account(constraint = rewards_mint.key() == nft_manager.rewards_mint)]
    pub rewards_mint: Account<'info, Mint>,

    #[account(mut)]
    pub house_owner: UncheckedAccount<'info>,

    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = coin_mint,
        associated_token::authority = house_owner
    )]
    pub house_owner_token_account: Account<'info, TokenAccount>,

    // #[account(constraint = coin_mint.key() == nft_manager.coin_mint)]
    // pub coin_mint: Account<'info, Mint>,

    pub metadata: UncheckedAccount<'info>,

    #[account(mut, associated_token::mint = nft_manager.coin_mint, associated_token::authority = nft_authority)]
    pub swap_coins: Account<'info, TokenAccount>,

    #[account(seeds = [b"swap_sols", nft_authority.key().as_ref()], bump)]
    pub swap_sols: UncheckedAccount<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub token_metadata_program: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}   

#[account]
pub struct NFTmanager {
    pub nft_mint: Pubkey,
    pub coin_mint: Pubkey,
    pub rewards_mint: Pubkey,
    pub nft_authority: Pubkey,
    pub total_coins: u64,
    pub coins_price: u64,
    pub rent_price: u64,
    pub swap_coins: Pubkey,
    pub swap_sols: Pubkey,
    pub rent_rewards: Pubkey,
    pub nft_minted: bool,
    pub rewards_pool_info: Pubkey,
    pub unlock_share_token: u64,
    pub unlock_sol: u64,
    pub nonce: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct NFTargs{
    pub name: String,
    pub symbol: String,
    pub uri: String,
    pub total_coins: u64,
    pub coins_price: u64,
}

#[derive(Accounts)]
pub struct SellShareToken<'info> {
    #[account(mut)]
    pub nft_manager: Account<'info, NFTmanager>,

    #[account(mut, associated_token::mint = nft_manager.coin_mint, associated_token::authority = nft_authority)]
    pub swap_coins: Account<'info, TokenAccount>,

    #[account(mut)]
    pub house_owner: Signer<'info>,

    #[account(seeds = [b"NFT_authority", nft_manager.key().as_ref()], bump)]
    /// CHECK: This is a PDA used as mint authority
    pub nft_authority: UncheckedAccount<'info>,


    #[account(mut, constraint = user_stake.owner == house_owner.key())]
    pub user_stake: Account<'info, UserStake>,

    #[account(init_if_needed,
        payer = house_owner,
        associated_token::mint = coin_mint,
        associated_token::authority = house_owner
    )]
    pub house_owner_token_account: Account<'info, TokenAccount>,

    #[account(constraint = coin_mint.key() == nft_manager.coin_mint)]
    pub coin_mint: Account<'info, Mint>,

    #[account(
        init_if_needed,
        payer = house_owner,
        space = 8 + 8 + 8, // Discriminator + share_token_amount + sol_amount
        seeds = [b"usershare", house_owner.key().as_ref()],
        bump,
        constraint = usershare_account.owner == house_owner.key()
    )]
    pub usershare_account: Account<'info, User_ledge>,

    #[account(mut,
        constraint = rewards_pool_info.key() == nft_manager.rewards_pool_info
    )]
    pub rewards_pool_info: Account<'info, Rewards_pool_info>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct BuyShareToken<'info> {
    #[account(mut)]
    pub nft_manager: Box<Account<'info, NFTmanager>>,

    #[account(mut, associated_token::mint = nft_manager.coin_mint, associated_token::authority = nft_authority)]
    pub swap_coins: Account<'info, TokenAccount>,

    #[account(mut,
        constraint = swap_sols.key() == nft_manager.swap_sols
    )]
    /// CHECK: This account is checked in the constraint
    pub swap_sols: UncheckedAccount<'info>,

    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init_if_needed,
        payer = user,
        space = 8 + 8 + 8, // Discriminator + share_token_amount + sol_amount
        seeds = [b"usershare", user.key().as_ref()],
        bump,
        constraint = user_share_account.owner == user.key() 
    )]
    pub user_share_account: Box<Account<'info, User_ledge>>,

    #[account(seeds = [b"NFT_authority", nft_manager.key().as_ref()], bump)]
    /// CHECK: This is a PDA used as authority
    pub nft_authority: UncheckedAccount<'info>,
    

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
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
    
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 32 + 32 + 32 + 8 + 8 + 8 + 16 + 1)]
    pub pool: Account<'info, Pool>,
    #[account(mut, mint::authority = reward_authority)]
    pub reward_mint: Account<'info, Mint>,  //奖励代币的mint
    #[account(mut, mint::authority = stake_authority)]
    pub staking_mint: Account<'info, Mint>, //
    #[account(
        seeds = [b"reward_authority", pool.key().as_ref()],
        bump,
    )]
    pub reward_authority: UncheckedAccount<'info>, //奖励代币的authority 是程序的pda账户
    #[account(
        seeds = [b"stake_authority", pool.key().as_ref()],
        bump,
    )]
    pub stake_authority: UncheckedAccount<'info>, //奖励代币的authority 是程序的pda账户
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct Stake<'info> {
    #[account(mut)]
    pub pool: Account<'info, Pool>,
    #[account(init_if_needed, 
        payer = user_authority, 
        space = 8 + 32 + 32 + 8 + 8,
        seeds = [b"user", user_authority.key().as_ref()],
        bump,
    )]
    pub user: Account<'info, User>,
    #[account(mut, 
        constraint = user_staking_account.owner == user_authority.key(),
        constraint = user_staking_account.mint == pool.staking_mint
    )]
    pub user_staking_account: Account<'info, TokenAccount>,
    #[account(mut, 
        constraint = pool_staking_account.owner == pool.key(),
        constraint = pool_staking_account.mint == pool.staking_mint
    )]
    pub pool_staking_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user_authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Unstake<'info> {
    #[account(mut)]
    pub pool: Account<'info, Pool>,
    #[account(mut)]
    pub user: Account<'info, User>,
    #[account(mut, constraint = user_staking_account.owner == user_authority.key(),
                    constraint = user_staking_account.mint == pool.staking_mint
    )]   
    pub user_staking_account: Account<'info, TokenAccount>,
    #[account(mut, constraint = pool_staking_account.owner == pool.key(),
                    constraint = pool_staking_account.mint == pool.staking_mint
    )]
    pub pool_staking_account: Account<'info, TokenAccount>,
    #[account(mut, constraint = user_reward_account.owner == user_authority.key(),
                    constraint = user_reward_account.mint == reward_mint.key()
    )]
    pub user_reward_account: Account<'info, TokenAccount>,

    #[account(constraint = reward_mint.key() == pool.reward_mint)]
    pub reward_mint: Account<'info, Mint>,

    pub user_authority: Signer<'info>,
    /// CHECK: This is the PDA that signs for the pool
    #[account(
        seeds = [b"stake_authority", pool.key().as_ref()],
        bump,
    )]
    pub stake_authority: UncheckedAccount<'info>,
    #[account(
        seeds = [b"reward_authority", pool.key().as_ref()],
        bump,
    )]
    pub reward_authority: UncheckedAccount<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ClaimRewardMasterchef<'info> {
    #[account(mut)]
    pub pool: Account<'info, Pool>,
    #[account(mut, mint::authority = pool.reward_authority)]
    pub reward_mint: Account<'info, Mint>,
    #[account(mut, owner = user_authority.key())]
    pub user: Account<'info, User>,
    #[account(mut,constraint = user_reward_account.owner == user_authority.key(),
                constraint = user_reward_account.mint == pool.reward_mint
    )]
    pub user_reward_account: Account<'info, TokenAccount>,

    pub user_authority: Signer<'info>,
    #[account(
        seeds = [b"reward_authority", pool.key().as_ref()],
        bump,
    )]
    pub reward_authority: UncheckedAccount<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Pool {
    pub reward_mint: Pubkey,
    pub staking_mint: Pubkey,
    pub reward_authority: Pubkey,
    pub stake_authority: Pubkey,
    pub total_staked: u64,
    pub reward_per_slot: u64,
    pub last_update_slot: u64,
    pub acc_reward_per_share: u128,
}

#[account]
pub struct User {
    pub amount: u64,
    pub reward_debt: u64,
}


#[derive(Accounts)]
pub struct ClaimRewardYfi<'info> {
    #[account(mut)]
    pub nft_manager: Account<'info, NFTmanager>,

    #[account(init_if_needed,
        payer = user,
        space = 8 + 8 + 8,
        seeds = [b"user_stake", user.key().as_ref()],
        constraint = user_stake.owner == user.key(),
        bump,
    )]
    pub user_stake: Account<'info, UserStake>,
    
    #[account(mut,
        associated_token::mint = nft_manager.rewards_mint,
        associated_token::authority = nft_authority
    )]
    pub rent_rewards: Account<'info, TokenAccount>,

    #[account(mut,constraint = rewards_pool_info.key() == nft_manager.rewards_pool_info)]
    pub rewards_pool_info: Account<'info, Rewards_pool_info>,
    
    #[account(mut,
        associated_token::mint = nft_manager.coin_mint,
        associated_token::authority = user
    )]
    pub user_token_account: Account<'info, TokenAccount>,
    
    #[account(seeds = [b"NFT_authority", nft_manager.key().as_ref()], bump)  ]
    /// CHECK: This is a PDA used as authority
    pub nft_authority: AccountInfo<'info>,

    #[account(mut,
        associated_token::mint = nft_manager.rewards_mint,
        associated_token::authority = user
    )]
    pub user_reward_account: Account<'info, TokenAccount>,

    #[account(mut)] 
    pub user: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct UserStake {
    pub owner: Pubkey,
    pub reward_tally: u64,
    pub reward_per_token_paid: u64,
}

#[derive(Accounts)]
pub struct PendingReward<'info> {
    pub pool: Account<'info, Pool>,
    pub user: Account<'info, User>,
}

