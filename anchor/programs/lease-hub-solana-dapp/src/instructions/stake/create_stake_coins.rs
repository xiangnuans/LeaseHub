use anchor_lang::prelude::*;
use crate::state::*;
use crate::error::ErrorCode;
use anchor_spl::{
    token::{mint_to, burn, Burn,Mint, MintTo, Token, TokenAccount},
};

pub fn create_stake_coin(ctx: Context<CreateStakeCoin>) -> Result<()> {
    Ok(())
}   

pub fn stake(ctx: Context<MintToken>,amount: u64) -> Result<()> {
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

pub fn unstake(ctx: Context<BurnToken>,amount: u64) -> Result<()> {
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

