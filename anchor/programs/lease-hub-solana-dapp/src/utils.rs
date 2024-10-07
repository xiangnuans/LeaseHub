use anchor_lang::{prelude::*, system_program};
use anchor_spl::token::{initialize_account3, InitializeAccount3, TokenAccount};
use mpl_token_metadata::{instructions, types, ID as mpl_metadata_id};
use solana_program::{program::invoke_signed, pubkey::Pubkey};

pub struct Metadata;

impl anchor_lang::Id for Metadata {
    fn id() -> Pubkey {
        mpl_metadata_id
    }
}

pub struct CurrentProgram;

impl anchor_lang::Id for CurrentProgram {
    fn id() -> Pubkey {
        crate::id()
    }
}

#[derive(Accounts)]
pub struct CreateMetadataAccountsV3cpi<'info> {
    /// CHECK:
    pub metadata: AccountInfo<'info>,
    /// CHECK:
    pub mint: AccountInfo<'info>,
    /// CHECK:
    pub mint_authority: AccountInfo<'info>,
    /// CHECK:
    pub payer: AccountInfo<'info>,
    /// CHECK:
    pub update_authority: AccountInfo<'info>,
    /// CHECK:
    pub system_program: AccountInfo<'info>,
}

pub fn create_metadata_accounts_v3<'info>(
    ctx: CpiContext<'_, '_, '_, 'info, CreateMetadataAccountsV3cpi<'info>>,
    data: types::DataV2,
    is_mutable: bool,
    update_authority_is_signer: bool,
    collection_details: Option<types::CollectionDetails>,
) -> Result<()> {
    let ix = instructions::CreateMetadataAccountV3 {
        metadata: ctx.accounts.metadata.key(),
        mint: ctx.accounts.mint.key(),
        mint_authority: ctx.accounts.mint_authority.key(),
        payer: ctx.accounts.payer.key(),
        update_authority: (
            ctx.accounts.update_authority.key(),
            update_authority_is_signer,
        ),
        system_program: ctx.accounts.system_program.key(),
        rent: None,
    }
    .instruction(instructions::CreateMetadataAccountV3InstructionArgs {
        data,
        is_mutable,
        collection_details,
    });

    invoke_signed(
        &ix,
        &ToAccountInfos::to_account_infos(&ctx),
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

#[derive(Accounts)]
pub struct VerifyCollectionCpi<'info> {
    //pub __program: AccountInfo<'info>,
    /// CHECK:
    pub metadata: AccountInfo<'info>,
    /// CHECK:
    pub collection_authority: AccountInfo<'info>,
    /// CHECK:
    pub payer: AccountInfo<'info>,
    /// CHECK:
    pub collection_mint: AccountInfo<'info>,
    /// CHECK:
    pub collection: AccountInfo<'info>,
    /// CHECK:
    pub collection_master_edition_account: AccountInfo<'info>,
    ///CHECK:
    pub collection_authority_record: Option<AccountInfo<'info>>,
}

pub fn verify_collection<'info>(
    ctx: CpiContext<'_, '_, '_, 'info, VerifyCollectionCpi<'info>>,
) -> Result<()> {
    let ix = instructions::VerifyCollection {
        metadata: ctx.accounts.metadata.key(),
        collection_authority: ctx.accounts.collection_authority.key(),
        payer: ctx.accounts.payer.key(),
        collection_mint: ctx.accounts.collection_mint.key(),
        collection: ctx.accounts.collection.key(),
        collection_master_edition_account: ctx.accounts.collection_master_edition_account.key(),
        collection_authority_record: ctx
            .accounts
            .collection_authority_record
            .as_ref()
            .map(|acc| acc.key()),
    }
    .instruction();

    // 执行 CPI 调用
    invoke_signed(&ix, &ToAccountInfos::to_account_infos(&ctx), &[]).map_err(Into::into)
}

pub fn create_token_account<'info>(
    authority: &AccountInfo<'info>,
    payer: &AccountInfo<'info>,
    token_account: &AccountInfo<'info>,
    mint_account: &AccountInfo<'info>,
    system_program: &AccountInfo<'info>,
    token_program: &AccountInfo<'info>,
    signer: &[&[&[u8]]],
) -> Result<()> {
    let space = TokenAccount::LEN;
    let lamports = Rent::get()?.minimum_balance(space);

    let create_account_cpi_ctx = CpiContext::new_with_signer(
        system_program.to_account_info(),
        system_program::CreateAccount {
            from: payer.to_account_info(),
            to: token_account.to_account_info(),
        },
        signer,
    );
    system_program::create_account(
        create_account_cpi_ctx,
        lamports,
        space as u64,
        token_program.key,
    )?;

    let initialize_account_cpi_ctx = CpiContext::new(
        token_program.to_account_info(),
        InitializeAccount3 {
            account: token_account.to_account_info(),
            mint: mint_account.to_account_info(),
            authority: authority.to_account_info(),
        },
    );
    initialize_account3(initialize_account_cpi_ctx)
}
