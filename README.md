# CkbGuardian
check ckb is work normal,only check support method ,not check method result
- https://cryptape.github.io/CkbGuardian/index.html

# add rpc 

pull request data to  https://github.com/cryptape/CkbGuardian/blob/main/ckb/resource/ckb.json

json 
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
If you want to be able to check your ckb node every day, you can submit an `issue`  or  `pull request`
- example: https://github.com/cryptape/CkbGuardian/pull/2/commits/a2dcefed7a61fbfa40d89564a9e8520dd7bc2cd2

### apiKeyName
if connect ckb service need api key 
1. add apikeyName : apiKeyName:SERVICE_API_KEY
2. add .env : SERVICE_API_KEY="xxxxxx" :https://github.com/gpBlockchain/CkbGuardian/blob/main/ckb/.env
3. mod gitflow:https://github.com/gpBlockchain/CkbGuardian/blob/main/.github/workflows/check-node.yml#L45-L46
