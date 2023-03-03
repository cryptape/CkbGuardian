import * as fs from "fs";

require('dotenv').config();

export class CkbNodeConfig {
    name: string
    url: string
    network: string
    rpc: string
    apiKeyName: string
    excludeMethods: string[]
}


export function getCkbNodeConfigByFile(path: string): CkbNodeConfig[] {
    const rawData = fs.readFileSync(path)
    return JSON.parse(rawData.toString())
        .map(config => {
            if (process.env[config.apiKeyName] != undefined) {
                config.rpc = config.rpc.replace("${apiKeyName}" , process.env[config.apiKeyName])
            }
            return {
                name: config.name,
                url: config.url,
                network: config.network,
                rpc: config.rpc,
                excludeMethods: config.excludeMethods
            }
        })
}

export function checkMethodIsExclude(config: CkbNodeConfig, method: string): boolean {
    return config.excludeMethods.some(currentMethod => currentMethod === method)
}
