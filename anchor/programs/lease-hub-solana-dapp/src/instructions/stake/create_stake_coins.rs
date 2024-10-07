use anchor_lang::prelude::*;
use crate::state::*;
use crate::error::ErrorCode;
use anchor_spl::{
    token::{mint_to, burn, Burn,Mint, MintTo, Token, TokenAccount},
};

pub fn create_stake_coin(ctx: Context<CreateStakeCoin>) -> Result<()> {
    Ok(())
}   

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


pub fn mint_token(ctx: Context<MintToken>,amount: u64) -> Result<()> {
    if ctx.accounts.owner.lamports() < amount {
        return Err(ErrorCode::InsufficientSol.into());
    }

    **ctx.accounts.owner.try_borrow_mut_lamports()? -= amount;
    **ctx.accounts.stake_account.try_borrow_mut_lamports()? += amount;

    let cpi_accounts = MintTo {
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.token_account.to_account_info(),
        authority: ctx.accounts.mint_authority.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    mint_to(cpi_ctx, amount)?;

    Ok(())
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

pub fn burn_token(ctx: Context<BurnToken>,amount: u64) -> Result<()> {
    let cpi_accounts = Burn {
        mint: ctx.accounts.mint.to_account_info(),
        from: ctx.accounts.token_account.to_account_info(),
        authority: ctx.accounts.mint_authority.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    burn(cpi_ctx, amount)?;

    **ctx.accounts.stake_account.try_borrow_mut_lamports()? -= amount;
    **ctx.accounts.owner.try_borrow_mut_lamports()? += amount;

    Ok(())
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

