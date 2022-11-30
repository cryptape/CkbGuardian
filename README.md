# CkbGuardian
check ckb is work normal,only check support method ,not check method result
- https://gpblockchain.github.io/CkbGuardian/mochawesome.html

# add rpc 

pull request data to  https://github.com/gpBlockchain/CkbGuardian/blob/main/ckb/resource/ckb.json

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

### apiKeyName
if connect ckb service need api key 
1. add apikeyName : apiKeyName:SERVICE_API_KEY
2. add .env : SERVICE_API_KEY="xxxxxx" :https://github.com/gpBlockchain/CkbGuardian/blob/main/ckb/.env
3. mod gitflow:https://github.com/gpBlockchain/CkbGuardian/blob/main/.github/workflows/check-node.yml#L45-L46
