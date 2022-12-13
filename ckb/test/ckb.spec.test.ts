import {checkMethodIsExclude, getCkbNodeConfigByFile} from "../service/ckbNodeConfigService";
import {CKB_CONFIG_FILE_PATH, RPC_DEBUG_SERVICE} from "../config/config";
import {CKBRPC} from "@ckb-lumos/rpc";
import fetch from "cross-fetch";
import {describe} from "mocha";
import {Indexer} from "@ckb-lumos/lumos";
import {expect} from "chai";

describe('Ckb Node Rpc check Tests', function () {
    this.timeout(1000_00000)
    const ckbConfigs = getCkbNodeConfigByFile(CKB_CONFIG_FILE_PATH)
    let idx = 0;
    ckbConfigs.forEach(config => {
        const TestCkBkbClient = new CKBRPC(config.rpc);
        afterEach(function () {
            if (!checkMethodIsExclude(config, this.currentTest.title)) {
                return;
            }
            this.currentTest.title = this.currentTest.title + ",expected failed ,but run passed now"
            if (this.currentTest.isPassed()) {
                this.currentTest.state = "failed"
                return;
            }
            this.currentTest.state = "passed"
        })
        describe(config.name, async () => {
            before(async () => {
                const version = await getCkbVersion(TestCkBkbClient)
                this.suites[idx].title = this.suites[idx].title + "(" + version + ")"
                idx++
            })
            describe('Chain', function () {


                this.timeout(1000_000)
                it('get_block', async () => {
                    let response = await TestCkBkbClient.getBlock("0xb2671d3cc16b7738bbc8902ef11322bc2bfe7c54f5ce4a5cdfdf57b1a02fcb11")
                    console.log("response1:", response)
                })
                it("get_block_by_number", async () => {
                    let response = await TestCkBkbClient.getBlockByNumber("0x400")
                    console.log("response1:", response)
                })
                it("get_header", async () => {
                    let response = await TestCkBkbClient.getHeader("0xb2671d3cc16b7738bbc8902ef11322bc2bfe7c54f5ce4a5cdfdf57b1a02fcb11")
                    console.log("response1:", response)
                })
                it("get_header_by_number", async () => {
                    let response = await TestCkBkbClient.getHeaderByNumber("0x400")
                    console.log("response1:", response)
                })
                it("get_block_filter", async () => {
                    let response = await request(1, config.rpc, "get_block_filter", ["0xb2671d3cc16b7738bbc8902ef11322bc2bfe7c54f5ce4a5cdfdf57b1a02fcb11"])
                    console.log("response1:", response)
                })
                it("get_transaction", async () => {
                    let response = await TestCkBkbClient.getTransaction("0x037dafd7f9c6f742e8c9f225191b441b0b5c4e8b3c1e87c29a2f2ec2fbbf6934")
                    console.log("response1:", response)
                })
                it("get_block_hash", async () => {
                    let response = await TestCkBkbClient.getBlockHash("0x400")
                    console.log("response1:", response)

                })
                it("get_tip_header", async () => {
                    let response = await TestCkBkbClient.getTipHeader()
                    console.log("response1:", response)
                })
                it("get_live_cell", async () => {
                    let response = await TestCkBkbClient.getLiveCell({
                            "index": "0x0",
                            "txHash": "0x037dafd7f9c6f742e8c9f225191b441b0b5c4e8b3c1e87c29a2f2ec2fbbf6934"
                        },
                        true)
                    console.log("response1:", response)
                })
                it("get_tip_block_number", async () => {

                    let response = await TestCkBkbClient.getTipBlockNumber()
                    console.log("response1:", response)
                })
                it("get_current_epoch", async () => {
                    let response = await TestCkBkbClient.getCurrentEpoch()
                    console.log("response1:", response)
                })
                it("get_epoch_by_number", async () => {
                    let response = await TestCkBkbClient.getEpochByNumber("0x0")
                    console.log("response1:", response)
                })

                it("get_block_economic_state", async () => {
                    let response = await TestCkBkbClient.getBlockEconomicState("0xb2671d3cc16b7738bbc8902ef11322bc2bfe7c54f5ce4a5cdfdf57b1a02fcb11")
                    console.log("response1:", response)
                })
                it("get_transaction_proof", async () => {
                    let response = await TestCkBkbClient.getTransactionProof(["0x037dafd7f9c6f742e8c9f225191b441b0b5c4e8b3c1e87c29a2f2ec2fbbf6934"])
                    console.log("response1:", response)
                })
                it("verify_transaction_proof", async () => {
                    let response = await TestCkBkbClient.verifyTransactionProof({
                        "blockHash": "0xb3c5b9789dff3821e298a62e6cc4060accb19ed2558f988a8826573252b9ae20",
                        "proof": {
                            "indices": ["0x6"],
                            "lemmas": [
                                "0xdeffa7c8e12d1bb51a1132c90e413c28210f55b8dcdadb8f47dd4621a6a08355",
                                "0x6d6bf0ffd88205f62e41eefc78a95abf8353843ff7b41a85dd2ce0750fa61a51"
                            ]
                        },
                        "witnessesRoot": "0xdcfb809616396e599c598b156769b2076be639232f29dedff51c5bd81eb03626"
                    })
                    console.log("response1:", response)
                })

                // it("get_fork_block",async ()=>{
                //     let response = await TestCkBkbClient.getForkBlock("0xb3c5b9789dff3821e298a62e6cc4060accb19ed2558f988a8826573252b9ae20")
                //     let response2 = await UnifraCkbClient.get_fork_block("0xb3c5b9789dff3821e298a62e6cc4060accb19ed2558f988a8826573252b9ae20")
                //     console.log("response1:",response)
                //     console.log("response2:",response2)
                //     expect(JSON.stringify(response).toString()).to.be.equal(JSON.stringify(response2).toString())
                //
                // })

                it("get_consensus", async () => {
                    let response = await TestCkBkbClient.getConsensus()
                    console.log("response1:", response)
                })
                it("get_block_median_time", async () => {
                    let response = await request(1, config.rpc, "get_block_median_time", ["0xb3c5b9789dff3821e298a62e6cc4060accb19ed2558f988a8826573252b9ae20"])
                    console.log("response1:", response)
                })

                it("estimate_cycles", async () => {

                    try {
                        let response = await request(1, config.rpc, "estimate_cycles",
                            [
                                {
                                    "cell_deps": [
                                        {
                                            "dep_type": "code",
                                            "out_point": {
                                                "index": "0x0",
                                                "tx_hash": "0xa4037a893eb48e18ed4ef61034ce26eba9c585f15c9cee102ae58505565eccc3"
                                            }
                                        }
                                    ],
                                    "header_deps": [
                                        "0x7978ec7ce5b507cfb52e149e36b1a23f6062ed150503c85bbf825da3599095ed"
                                    ],
                                    "inputs": [
                                        {
                                            "previous_output": {
                                                "index": "0x0",
                                                "tx_hash": "0x365698b50ca0da75dca2c87f9e7b563811d3b5813736b8cc62cc3b106faceb17"
                                            },
                                            "since": "0x0"
                                        }
                                    ],
                                    "outputs": [
                                        {
                                            "capacity": "0x2540be400",
                                            "lock": {
                                                "code_hash": "0x28e83a1277d48add8e72fadaa9248559e1b632bab2bd60b27955ebc4c03800a5",
                                                "hash_type": "data",
                                                "args": "0x"
                                            },
                                            "type": null
                                        }
                                    ],
                                    "outputs_data": [
                                        "0x"
                                    ],
                                    "version": "0x0",
                                    "witnesses": []
                                }]
                        )

                        console.log("response1:", response)
                    } catch (e) {
                        expect(e.toString()).to.be.include("TransactionFailedToResolve")
                        return
                    }
                    expect.fail("failed")

                })
                it("get_fee_rate_statics", async () => {
                    await request(1, config.rpc, "get_fee_rate_statics", [])
                })
            })
            describe('Experiment', function () {
                it("calculate_dao_maximum_withdraw", async () => {
                    try {
                        await TestCkBkbClient.calculateDaoMaximumWithdraw(
                            {
                                index: "0x0",
                                txHash: "0x42e82575740ec53e0b52ce8a36e212ad62beb58d1beac997996363e0bfe3d9e5"
                            },
                            "0xa5f5c85987a15de25661e5a214f2c1449cd803f071acc7999820f25246471f40")
                    } catch (e) {
                        expect(e.toString()).to.be.include("DaoError")
                        return
                    }
                    expect.fail("failed ")
                })
                it("dry_run_transaction", async () => {
                    try {
                        await TestCkBkbClient.dryRunTransaction({
                            cellDeps: [
                                {
                                    depType: "code",
                                    outPoint: {
                                        index: "0x0",
                                        txHash: "0xa4037a893eb48e18ed4ef61034ce26eba9c585f15c9cee102ae58505565eccc3"
                                    }
                                }
                            ],
                            headerDeps: [
                                "0x7978ec7ce5b507cfb52e149e36b1a23f6062ed150503c85bbf825da3599095ed"
                            ],
                            inputs: [
                                {
                                    previousOutput: {
                                        index: "0x0",
                                        txHash: "0x365698b50ca0da75dca2c87f9e7b563811d3b5813736b8cc62cc3b106faceb17"
                                    },
                                    since: "0x0"
                                }
                            ],
                            outputs: [
                                {
                                    capacity: "0x2540be400",
                                    lock: {
                                        codeHash: "0x28e83a1277d48add8e72fadaa9248559e1b632bab2bd60b27955ebc4c03800a5",
                                        hashType: "data",
                                        args: "0x"
                                    },
                                    type: null
                                }
                            ],
                            outputsData: [
                                "0x"
                            ],
                            version: "0x0",
                            witnesses: []
                        })
                    } catch (e) {
                        expect(e.toString()).to.be.include("TransactionFailedToResolve")
                        return
                    }
                    expect.fail("failed")
                })
            })
            describe('Alert', function () {
                it("send_alert", async () => {
                    await request(1, config.rpc, "send_alert", [
                        {
                            "id": "0x1",
                            "cancel": "0x0",
                            "priority": "0x1",
                            "message": "An example alert message!",
                            "notice_until": "0x24bcca57c00",
                            "signatures": [
                                "0xbd07059aa9a3d057da294c2c4d96fa1e67eeb089837c87b523f124239e18e9fc7d11bb95b720478f7f937d073517d0e4eb9a91d12da5c88a05f750362f4c214dd0",
                                "0x0242ef40bb64fe3189284de91f981b17f4d740c5e24a3fc9b70059db6aa1d198a2e76da4f84ab37549880d116860976e0cf81cd039563c452412076ebffa2e4453"
                            ]
                        }
                    ])
                })
            })
            describe('Indexer', function () {
                const indexerClient = new Indexer(config.rpc, config.rpc)
                it("get_indexer_tip", async () => {
                    // await request(1,)
                    await TestCkBkbClient.getIndexerTip()
                })
                it("get_cells", async () => {
                    await TestCkBkbClient.getCells({
                        "script": {
                            "codeHash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
                            "hashType": "type",
                            "args": "0x5989ae415bb667931a99896e5fbbfad9ba53a223"
                        },
                        "scriptType": "lock"
                    }, "asc", "0x64")
                })
                it("get_transactions", async () => {
                    await TestCkBkbClient.getTransactions({
                            "script": {
                                "codeHash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
                                "hashType": "type",
                                "args": "0x5989ae415bb667931a99896e5fbbfad9ba53a223"
                            },
                            "scriptType": "lock"
                        }, "asc", "0x64"
                    )
                })
                it("get_cells_capacity", async () => {
                    await TestCkBkbClient.getCellsCapacity({
                        "script": {
                            "codeHash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
                            "hashType": "type",
                            "args": "0x5989ae415bb667931a99896e5fbbfad9ba53a223"
                        },
                        "scriptType": "lock"
                    })
                })
            })
            describe.skip('IntegrationTest', function () {
                it("process_block_without_verify", async () => {
                    await request(1, config.rpc, "process_block_without_verify", [
                        {
                            "header": {
                                "compact_target": "0x1e083126",
                                "dao": "0xb5a3e047474401001bc476b9ee573000c0c387962a38000000febffacf030000",
                                "epoch": "0x7080018000001",
                                "extra_hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
                                "nonce": "0x0",
                                "number": "0x400",
                                "parent_hash": "0xae003585fa15309b30b31aed3dcf385e9472c3c3e93746a6c4540629a6a1ed2d",
                                "proposals_hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
                                "timestamp": "0x5cd2b117",
                                "transactions_root": "0xc47d5b78b3c4c4c853e2a32810818940d0ee403423bea9ec7b8e566d9595206c",
                                "version": "0x0"
                            },
                            "proposals": [],
                            "transactions": [{
                                "cell_deps": [],
                                "header_deps": [],
                                "inputs": [{
                                    "previous_output": {
                                        "index": "0xffffffff",
                                        "tx_hash": "0x0000000000000000000000000000000000000000000000000000000000000000"
                                    },
                                    "since": "0x400"
                                }],
                                "outputs": [{
                                    "capacity": "0x18e64b61cf",
                                    "lock": {
                                        "code_hash": "0x28e83a1277d48add8e72fadaa9248559e1b632bab2bd60b27955ebc4c03800a5",
                                        "hash_type": "data",
                                        "args": "0x"
                                    },
                                    "type": null
                                }],
                                "outputs_data": [
                                    "0x"
                                ],
                                "version": "0x0",
                                "witnesses": [
                                    "0x450000000c000000410000003500000010000000300000003100000028e83a1277d48add8e72fadaa9248559e1b632bab2bd60b27955ebc4c03800a5000000000000000000"
                                ]
                            }],
                            "uncles": []
                        },
                        true
                    ])
                })
                it("truncate", async () => {
                    await request(1, config.rpc, "truncate", ["0xa5f5c85987a15de25661e5a214f2c1449cd803f071acc7999820f25246471f40"])
                })
                it("notify_transaction", async () => {
                    await request(1, config.rpc, "notify_transaction", [{
                        "cell_deps": [{
                            "dep_type": "code",
                            "out_point": {
                                "index": "0x0",
                                "tx_hash": "0xa4037a893eb48e18ed4ef61034ce26eba9c585f15c9cee102ae58505565eccc3"
                            }
                        }],
                        "header_deps": [
                            "0x7978ec7ce5b507cfb52e149e36b1a23f6062ed150503c85bbf825da3599095ed"
                        ],
                        "inputs": [{
                            "previous_output": {
                                "index": "0x0",
                                "tx_hash": "0x365698b50ca0da75dca2c87f9e7b563811d3b5813736b8cc62cc3b106faceb17"
                            },
                            "since": "0x0"
                        }],
                        "outputs": [{
                            "capacity": "0x2540be400",
                            "lock": {
                                "code_hash": "0x28e83a1277d48add8e72fadaa9248559e1b632bab2bd60b27955ebc4c03800a5",
                                "hash_type": "data",
                                "args": "0x"
                            },
                            "type": null
                        }],
                        "outputs_data": [
                            "0x"
                        ],
                        "version": "0x0",
                        "witnesses": []
                    }])
                })
            })
            describe('Net', function () {
                it("local_node_info", async () => {
                    await TestCkBkbClient.localNodeInfo()
                })
                it("get_peers", async () => {
                    await TestCkBkbClient.getPeers()
                })
                it("get_banned_addresses", async () => {
                    await TestCkBkbClient.getBannedAddresses()
                })
                it("clear_banned_addresses", async () => {
                    await TestCkBkbClient.clearBannedAddresses()
                })
                it("set_ban", async () => {
                    await TestCkBkbClient.setBan("192.168.0.2", "delete", "0x1ac89236180",
                        true,
                        "set_ban example")

                })
                it("sync_state", async () => {
                    await TestCkBkbClient.syncState()
                })
                it("set_network_active", async () => {
                    await TestCkBkbClient.setNetworkActive(true)
                })
                it("add_node", async () => {
                    await TestCkBkbClient.addNode("id1", "/ip4/192.168.2.100/tcp/8114/QmUsZHPbjjzU627UZFt4k8j6ycEcNvXRnVGxCPKqwbAfQS")
                })
                it("remove_node", async () => {
                    await TestCkBkbClient.removeNode("1234")
                })
                it("ping_peers", async () => {
                    await TestCkBkbClient.pingPeers()
                })

            })
            describe('Pool', function () {
                it("send_transaction", async () => {
                    //todo
                })
                it("remove_transaction", async () => {
                    await request(1, config.rpc, "remove_transaction", ["0xa0ef4eb5f4ceeb08a4c8524d84c5da95dce2f608e0ca2ec8091191b0f330c6e3"])
                })
                it("tx_pool_info", async () => {
                    await TestCkBkbClient.txPoolInfo()
                })
                it("clear_tx_pool", async () => {
                    await TestCkBkbClient.clearTxPool()
                })
                it("get_raw_tx_pool", async () => {
                    await TestCkBkbClient.getRawTxPool()
                })
                it("tx_pool_ready", async () => {
                    await request(1, config.rpc, "tx_pool_ready", [])
                })
            });
            describe('Stats', function () {
                it("get_blockchain_info", async () => {
                    await request(1, config.rpc, "get_blockchain_info", [])
                })
                it("get_deployments_info", async () => {
                    await request(1, config.rpc, "get_deployments_info", [])
                })
            });
            describe('Subscription', function () {
                it("subscribe", async () => {
                    await request(1, config.rpc, "subscribe", ["new_tip_header"])
                })
                it("unsubscribe", async () => {
                    await request(1, config.rpc, "unsubscribe", ["0x2a"])
                })
            });
        });
    });


});


const request = async (
    id: number,
    ckbIndexerUrl: string,
    method: string,
    params?: any
): Promise<any> => {
    if (RPC_DEBUG_SERVICE) {
        console.log("curl --location --request POST '" + ckbIndexerUrl + "' \\\n" +
            "--header 'Content-Type: application/json' \\\n" +
            "--data-raw '{\n" +
            "\t\"jsonrpc\":\"2.0\",\n" +
            "\t\"method\":\"" + method + "\",\n" +
            "\t\"params\":" + JSON.stringify(params) + ",\n" +
            "\t\"id\":64\n" +
            "}'")
    }
    const res = await fetch(ckbIndexerUrl, {
        method: "POST",
        body: JSON.stringify({
            id,
            jsonrpc: "2.0",
            method,
            params
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (res.status !== 200) {
        throw new Error(`light client request failed with HTTP code ${res.status}`);
    }
    const data = await res.json();

    if (data.error !== undefined) {
        if (RPC_DEBUG_SERVICE) {
            console.log(JSON.stringify(data.error))
        }
        throw new Error(
            `light client request rpc failed with error: ${JSON.stringify(
                data.error
            )}`
        );
    }
    if (RPC_DEBUG_SERVICE) {
        console.log(JSON.stringify(data.result))
    }
    return data.result;
};

async function getCkbVersion(ckbRpcClient: CKBRPC): Promise<String> {
    try {

        let info = await ckbRpcClient.localNodeInfo()
        return info.version
    } catch (e) {
        return "-"
    }

}
