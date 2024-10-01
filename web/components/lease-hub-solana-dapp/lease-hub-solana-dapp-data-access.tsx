'use client';

import {
  getLeaseHubSolanaDappProgram,
  getLeaseHubSolanaDappProgramId,
} from '@lease-hub-solana-dapp/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function useLeaseHubSolanaDappProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getLeaseHubSolanaDappProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getLeaseHubSolanaDappProgram(provider);

  const accounts = useQuery({
    queryKey: ['lease-hub-solana-dapp', 'all', { cluster }],
    queryFn: () => program.account.leaseHubSolanaDapp.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const initialize = useMutation({
    mutationKey: ['lease-hub-solana-dapp', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods
        .initialize()
        .accounts({ leaseHubSolanaDapp: keypair.publicKey })
        .signers([keypair])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  };
}

export function useLeaseHubSolanaDappProgramAccount({
  account,
}: {
  account: PublicKey;
}) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useLeaseHubSolanaDappProgram();

  const accountQuery = useQuery({
    queryKey: ['lease-hub-solana-dapp', 'fetch', { cluster, account }],
    queryFn: () => program.account.leaseHubSolanaDapp.fetch(account),
  });

  const closeMutation = useMutation({
    mutationKey: ['lease-hub-solana-dapp', 'close', { cluster, account }],
    mutationFn: () =>
      program.methods.close().accounts({ leaseHubSolanaDapp: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  const decrementMutation = useMutation({
    mutationKey: ['lease-hub-solana-dapp', 'decrement', { cluster, account }],
    mutationFn: () =>
      program.methods
        .decrement()
        .accounts({ leaseHubSolanaDapp: account })
        .rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const incrementMutation = useMutation({
    mutationKey: ['lease-hub-solana-dapp', 'increment', { cluster, account }],
    mutationFn: () =>
      program.methods
        .increment()
        .accounts({ leaseHubSolanaDapp: account })
        .rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const setMutation = useMutation({
    mutationKey: ['lease-hub-solana-dapp', 'set', { cluster, account }],
    mutationFn: (value: number) =>
      program.methods
        .set(value)
        .accounts({ leaseHubSolanaDapp: account })
        .rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  };
}
