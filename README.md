# CkbGuardian
A RPC status monitor for well-known CKB public nodes. It checks RPC connectivity. It does NOT check result validity.

Link: https://cryptape.github.io/CkbGuardian/index.html

# How to Add New Node 

Edit https://github.com/cryptape/CkbGuardian/blob/main/ckb/resource/ckb.json and send a pull request.

Example: https://github.com/cryptape/CkbGuardian/pull/2/commits/a2dcefed7a61fbfa40d89564a9e8520dd7bc2cd2

```
export class CkbNodeConfig {
    name: string.  // server name
    url: string.   // server url 
    network: string. // now noly support main 
    rpc: string.     // rpc url 
    apiKeyName: string. // if need api-key 
    excludeMethods: string[]. // service not support methods 
}
```

### apiKeyName
if connect ckb service need api key 
1. add apikeyName : apiKeyName:SERVICE_API_KEY
2. add .env : SERVICE_API_KEY="xxxxxx" :https://github.com/gpBlockchain/CkbGuardian/blob/main/ckb/.env
3. mod gitflow:https://github.com/gpBlockchain/CkbGuardian/blob/main/.github/workflows/check-node.yml#L45-L46

### limit dangerous rpc's

You can use https://github.com/jiangxianliang007/ckb-nginx-proxy to run the ckb proxy to limit dangerous rpc's

