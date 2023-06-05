# CkbGuardian

CkbGuardian is a tool designed to monitor the RPC status of well-known CKB public nodes. Its main function is to check the connectivity of RPC, not the validity of results.

Visit the link: https://cryptape.github.io/CkbGuardian/index.html

# How to Add a New Node

If you want to add a new node, you can edit this file: https://github.com/cryptape/CkbGuardian/blob/main/ckb/resource/ckb.json, and then submit a pull request.

Here's an example: https://github.com/cryptape/CkbGuardian/pull/2/commits/a2dcefed7a61fbfa40d89564a9e8520dd7bc2cd2

The node configuration should follow this format:

```javascript
    export class CkbNodeConfig {
        name: string.  // Server name
        url: string.   // Server URL
        network: string. // Currently support the main  and test network
        rpc: string.     // RPC URL
        apiKeyName: string. // If an API key is needed
        excludeMethods: string[]. // Methods not supported by the service
    }
```

### apiKeyName

If connecting to the CKB service requires an API key, you need to:

  1. Add apiKeyName : apiKeyName:SERVICE_API_KEY
  2. Add to .env file: SERVICE_API_KEY="xxxxxx", file location: https://github.com/gpBlockchain/CkbGuardian/blob/main/ckb/.env
  3. Modify gitflow, see: https://github.com/cryptape/CkbGuardian/blob/main/.github/workflows/check-node.yml#L45-L46

### Limiting Dangerous RPCs

You can use https://github.com/jiangxianliang007/ckb-nginx-proxy to run the CKB proxy to limit dangerous RPCs.
