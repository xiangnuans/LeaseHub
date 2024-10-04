import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { LeaseHubSolanaDapp } from '../target/types/lease_hub_solana_dapp';

describe('lease-hub-solana-dapp', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace
    .LeaseHubSolanaDapp as Program<LeaseHubSolanaDapp>;

  const leaseHubSolanaDappKeypair = Keypair.generate();

  it('Initialize LeaseHubSolanaDapp', async () => {
    await program.methods
      .initialize()
      .accounts({
        leaseHubSolanaDapp: leaseHubSolanaDappKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([leaseHubSolanaDappKeypair])
      .rpc();

    const currentCount = await program.account.leaseHubSolanaDapp.fetch(
      leaseHubSolanaDappKeypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment LeaseHubSolanaDapp', async () => {
    await program.methods
      .increment()
      .accounts({ leaseHubSolanaDapp: leaseHubSolanaDappKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.leaseHubSolanaDapp.fetch(
      leaseHubSolanaDappKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment LeaseHubSolanaDapp Again', async () => {
    await program.methods
      .increment()
      .accounts({ leaseHubSolanaDapp: leaseHubSolanaDappKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.leaseHubSolanaDapp.fetch(
      leaseHubSolanaDappKeypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement LeaseHubSolanaDapp', async () => {
    await program.methods
      .decrement()
      .accounts({ leaseHubSolanaDapp: leaseHubSolanaDappKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.leaseHubSolanaDapp.fetch(
      leaseHubSolanaDappKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set leaseHubSolanaDapp value', async () => {
    await program.methods
      .set(42)
      .accounts({ leaseHubSolanaDapp: leaseHubSolanaDappKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.leaseHubSolanaDapp.fetch(
      leaseHubSolanaDappKeypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the leaseHubSolanaDapp account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        leaseHubSolanaDapp: leaseHubSolanaDappKeypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.leaseHubSolanaDapp.fetchNullable(
      leaseHubSolanaDappKeypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
