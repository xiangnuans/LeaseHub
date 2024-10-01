// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import LeaseHubSolanaDappIDL from '../target/idl/lease_hub_solana_dapp.json';
import type { LeaseHubSolanaDapp } from '../target/types/lease_hub_solana_dapp';

// Re-export the generated IDL and type
export { LeaseHubSolanaDapp, LeaseHubSolanaDappIDL };

// The programId is imported from the program IDL.
export const LEASE_HUB_SOLANA_DAPP_PROGRAM_ID = new PublicKey(
  LeaseHubSolanaDappIDL.address
);

// This is a helper function to get the LeaseHubSolanaDapp Anchor program.
export function getLeaseHubSolanaDappProgram(provider: AnchorProvider) {
  return new Program(LeaseHubSolanaDappIDL as LeaseHubSolanaDapp, provider);
}

// This is a helper function to get the program ID for the LeaseHubSolanaDapp program depending on the cluster.
export function getLeaseHubSolanaDappProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return LEASE_HUB_SOLANA_DAPP_PROGRAM_ID;
  }
}
