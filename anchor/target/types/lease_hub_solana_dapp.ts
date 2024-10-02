/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/lease_hub_solana_dapp.json`.
 */
export type LeaseHubSolanaDapp = {
  "address": "4P76KAJyhNTBvV1iTFv9hAnJ8vmcUHWQaBDoDLAGLYjX",
  "metadata": {
    "name": "leaseHubSolanaDapp",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createStakePool",
      "discriminator": [
        198,
        175,
        88,
        63,
        128,
        43,
        8,
        214
      ],
      "accounts": [
        {
          "name": "stakePool",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "stakePool",
      "discriminator": [
        121,
        34,
        206,
        21,
        79,
        127,
        255,
        28
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidInputUpdateParam",
      "msg": "Invalid input update parameter"
    }
  ],
  "types": [
    {
      "name": "stakePool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "totalStaked",
            "type": "u64"
          },
          {
            "name": "stakerCount",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    }
  ]
};
