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
    network: string. // now support main 
    rpc: string.     // rpc url 
    apiKeyName: string. // rpc with apiKey
    excludeMethods: string[]. // service not support methods 
}
```
