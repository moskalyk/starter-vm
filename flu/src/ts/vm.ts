import { helloWorld, registerVM } from './main.js'
import { Fluence } from '@fluencelabs/js-client'
import { VM } from '@ethereumjs/vm';
import { Account, Address, hexToBytes, generateAddress } from '@ethereumjs/util';
import { Common } from '@ethereumjs/common';
import { LegacyTransaction } from '@ethereumjs/tx';
import abi from 'ethereumjs-abi';

class Transaction {
    id: number;
    priority: number;
    data: any; // Replace 'any' with the specific type of your transaction data

    constructor(id: number, priority: number, data: any) {
        this.id = id;
        this.priority = priority;
        this.data = data;
    }
}

class PriorityQueue {
    private queue: Transaction[];

    constructor() {
        this.queue = [];
    }

    async enqueue(transaction: Transaction): Promise<void> {
        this.queue.push(transaction);
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    async dequeue(): Promise<Transaction | null> {
        return this.queue.shift() || null;
    }

    async peek(): Promise<Transaction | null> {
        return this.queue.length > 0 ? this.queue[0] : null;
    }

    async isEmpty(): Promise<boolean> {
        console.log('isEmpty')
        return this.queue.length === 0;
    }
}

async function processTransactions(queue: PriorityQueue): Promise<void> {
    const common = new Common({ chain: 'mainnet' });
    const vm: any = await VM.create({ common });
    const account = new Account(BigInt(1), BigInt(10000000000000000000000000));

    // dummy priv key
    const caller = new Address(hexToBytes('0xeaFaEC3B7706C42285Be2BEE2D6DD9aD6d0c818d'))
    const privateKey = Buffer.from('64a33657ffb69b06d5a3c6c7ee7e9545f9b13375fe79ae4b749adb9341ca9a25', 'hex');
    
    // Pre-fund the account
    await vm.stateManager.putAccount(caller, account);

    let times = [];
    let totalTime = 0;

    function processNextTransaction() {
        queue.dequeue().then(async (transaction: any) => {
            if (transaction) {
                console.log(transaction)
                console.log(`Processing transaction: ${transaction.id}`);
                let start = Date.now();
                let tx6 = LegacyTransaction.fromTxData(transaction.data);
                let signedTx6 = await tx6.sign(privateKey);
                let result6 = await vm.runTx({ tx: signedTx6 });
                const gasUsed = Number(result6.totalGasSpent);

                console.log(`Gas used in wei: ${gasUsed}`);
                console.log(`CAD: $${107374.1824 / gasUsed}`);
                console.log(`Processing transaction: ${transaction.id}`);
                let end = Date.now();
                times.push(end - start);
                totalTime += end - start;
                // Process the transaction
                // ...
                setImmediate(processNextTransaction); // Schedule the next iteration
            } else {
                let averageTime = totalTime / times.length; // Average time per transaction in milliseconds
                let transactionsPerSecond = (times.length / totalTime) * 1000; // Convert totalTime to seconds and calculate TPS
                
                console.log(`Average processing time: ${averageTime} ms`);
                console.log(`Transactions per second: ${transactionsPerSecond}`);

                // Reset times and totalTime for the next run
                times = [];
                totalTime = 0;
                // Queue is empty, check again after some time
                setTimeout(processNextTransaction, 1000); // Check again after 1 second
            }
        }).catch(err => {
            console.error('Error processing transaction:', err);
            setImmediate(processNextTransaction);
        });
    }

    processNextTransaction();
}

let nonce = 1;

(async () => {
    let pq = new PriorityQueue();
    processTransactions(pq);

        // deploy a contract
    const bytecode = '0x60806040523480156200001157600080fd5b506040518060a0016040528060628152602001620018b66062913962000037816200005d565b506003805460ff196101003302166001600160a81b0319909116176001179055620001e0565b60026200006b828262000114565b5050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200009a57607f821691505b602082108103620000bb57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200010f57600081815260208120601f850160051c81016020861015620000ea5750805b601f850160051c820191505b818110156200010b57828155600101620000f6565b5050505b505050565b81516001600160401b038111156200013057620001306200006f565b620001488162000141845462000085565b84620000c1565b602080601f831160018114620001805760008415620001675750858301515b600019600386901b1c1916600185901b1785556200010b565b600085815260208120601f198616915b82811015620001b15788860151825594840194600190910190840162000190565b5085821015620001d05787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6116c680620001f06000396000f3fe608060405234801561001057600080fd5b506004361061010a5760003560e01c80638da5cb5b116100a2578063a3663d3711610071578063a3663d371461023f578063ac9f022214610268578063d5374c251461027b578063e985e9c51461028e578063f242432a146102a157600080fd5b80638da5cb5b146101d65780639394a29d14610206578063a0712d6814610219578063a22cb4651461022c57600080fd5b80634e1273f4116100de5780634e1273f41461018d57806361bc221a146101ad57806367b7c034146101b65780637c252208146101c357600080fd5b8062fdd58e1461010f57806301ffc9a7146101355780630e89341c146101585780632eb2c2d614610178575b600080fd5b61012261011d366004610fa8565b6102b4565b6040519081526020015b60405180910390f35b610148610143366004610feb565b6102dc565b604051901515815260200161012c565b61016b61016636600461100f565b61032c565b60405161012c919061106e565b61018b6101863660046111c7565b6103c0565b005b6101a061019b366004611271565b61042c565b60405161012c919061136c565b61012260045481565b6003546101489060ff1681565b6101a06101d136600461137f565b610501565b6003546101ee9061010090046001600160a01b031681565b6040516001600160a01b03909116815260200161012c565b61018b6102143660046113a1565b610586565b61018b61022736600461100f565b6106ef565b61018b61023a3660046113ee565b610783565b6101ee61024d36600461100f565b6006602052600090815260409020546001600160a01b031681565b61018b610276366004611421565b610792565b61012261028936600461143c565b6107f0565b61014861029c366004611468565b61083a565b61018b6102af366004611492565b610868565b6000818152602081815260408083206001600160a01b03861684529091529020545b92915050565b60006001600160e01b03198216636cdb3d1360e11b148061030d57506001600160e01b031982166303a24d0760e21b145b806102d657506301ffc9a760e01b6001600160e01b03198316146102d6565b60606002805461033b906114f7565b80601f0160208091040260200160405190810160405280929190818152602001828054610367906114f7565b80156103b45780601f10610389576101008083540402835291602001916103b4565b820191906000526020600020905b81548152906001019060200180831161039757829003601f168201915b50505050509050919050565b336001600160a01b03861681148015906103e157506103df868261083a565b155b156104175760405163711bec9160e11b81526001600160a01b038083166004830152871660248201526044015b60405180910390fd5b61042486868686866108c7565b505050505050565b6060815183511461045d5781518351604051635b05999160e01b81526004810192909252602482015260440161040e565b6000835167ffffffffffffffff81111561047957610479611081565b6040519080825280602002602001820160405280156104a2578160200160208202803683370190505b50905060005b84518110156104f9576020808202860101516104cc906020808402870101516102b4565b8282815181106104de576104de611531565b60209081029190910101526104f28161155d565b90506104a8565b509392505050565b60008281526005602052604090208054606091908390811061052557610525611531565b9060005260206000200180548060200260200160405190810160405280929190818152602001828054801561057957602002820191906000526020600020905b815481526020019060010190808311610565575b5050505050905092915050565b60035460ff166105c65760405162461bcd60e51b815260206004820152600b60248201526a4e6f7420776f726b696e6760a81b604482015260640161040e565b604051627eeac760e11b815233600482015260248101839052600090309062fdd58e90604401602060405180830381865afa158015610609573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061062d9190611576565b116106665760405162461bcd60e51b81526020600482015260096024820152682737ba1027bbb732b960b91b604482015260640161040e565b6000828152600660205260409020546001600160a01b031633146106b85760405162461bcd60e51b81526020600482015260096024820152682737ba1037bbb732b960b91b604482015260640161040e565b6000828152600560209081526040822080546001810182559083529181902083516106ea939190910191840190610f2c565b505050565b60035460ff1661072f5760405162461bcd60e51b815260206004820152600b60248201526a4e6f7420776f726b696e6760a81b604482015260640161040e565b61074c33600454836040518060200160405280600081525061092e565b60048054600090815260066020526040812080546001600160a01b031916331790558154919061077b8361155d565b919050555050565b61078e33838361098b565b5050565b60035461010090046001600160a01b031633146107dd5760405162461bcd60e51b81526020600482015260096024820152682737ba1037bbb732b960b91b604482015260640161040e565b6003805460ff1916911515919091179055565b6005602052826000526040600020828154811061080c57600080fd5b90600052602060002001818154811061082457600080fd5b9060005260206000200160009250925050505481565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b336001600160a01b03861681148015906108895750610887868261083a565b155b156108ba5760405163711bec9160e11b81526001600160a01b0380831660048301528716602482015260440161040e565b6104248686868686610a21565b6001600160a01b0384166108f157604051632bfa23e760e11b81526000600482015260240161040e565b6001600160a01b03851661091a57604051626a0d4560e21b81526000600482015260240161040e565b6109278585858585610aaf565b5050505050565b6001600160a01b03841661095857604051632bfa23e760e11b81526000600482015260240161040e565b60408051600180825260208201869052818301908152606082018590526080820190925290610424600087848487610aaf565b6001600160a01b0382166109b45760405162ced3e160e81b81526000600482015260240161040e565b6001600160a01b03838116600081815260016020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b038416610a4b57604051632bfa23e760e11b81526000600482015260240161040e565b6001600160a01b038516610a7457604051626a0d4560e21b81526000600482015260240161040e565b60408051600180825260208201869052818301908152606082018590526080820190925290610aa68787848487610aaf565b50505050505050565b610abb85858585610b02565b6001600160a01b038416156109275782513390600103610af45760208481015190840151610aed838989858589610d1f565b5050610424565b610424818787878787610e43565b8051825114610b315781518151604051635b05999160e01b81526004810192909252602482015260440161040e565b3360005b8351811015610c40576020818102858101820151908501909101516001600160a01b03881615610be8576000828152602081815260408083206001600160a01b038c16845290915290205481811015610bc1576040516303dee4c560e01b81526001600160a01b038a16600482015260248101829052604481018390526064810184905260840161040e565b6000838152602081815260408083206001600160a01b038d16845290915290209082900390555b6001600160a01b03871615610c2d576000828152602081815260408083206001600160a01b038b16845290915281208054839290610c2790849061158f565b90915550505b505080610c399061155d565b9050610b35565b508251600103610cc15760208301516000906020840151909150856001600160a01b0316876001600160a01b0316846001600160a01b03167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628585604051610cb2929190918252602082015260400190565b60405180910390a45050610927565b836001600160a01b0316856001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8686604051610d109291906115a2565b60405180910390a45050505050565b6001600160a01b0384163b156104245760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e6190610d6390899089908890889088906004016115d0565b6020604051808303816000875af1925050508015610d9e575060408051601f3d908101601f19168201909252610d9b91810190611615565b60015b610e07573d808015610dcc576040519150601f19603f3d011682016040523d82523d6000602084013e610dd1565b606091505b508051600003610dff57604051632bfa23e760e11b81526001600160a01b038616600482015260240161040e565b805181602001fd5b6001600160e01b0319811663f23a6e6160e01b14610aa657604051632bfa23e760e11b81526001600160a01b038616600482015260240161040e565b6001600160a01b0384163b156104245760405163bc197c8160e01b81526001600160a01b0385169063bc197c8190610e879089908990889088908890600401611632565b6020604051808303816000875af1925050508015610ec2575060408051601f3d908101601f19168201909252610ebf91810190611615565b60015b610ef0573d808015610dcc576040519150601f19603f3d011682016040523d82523d6000602084013e610dd1565b6001600160e01b0319811663bc197c8160e01b14610aa657604051632bfa23e760e11b81526001600160a01b038616600482015260240161040e565b828054828255906000526020600020908101928215610f67579160200282015b82811115610f67578251825591602001919060010190610f4c565b50610f73929150610f77565b5090565b5b80821115610f735760008155600101610f78565b80356001600160a01b0381168114610fa357600080fd5b919050565b60008060408385031215610fbb57600080fd5b610fc483610f8c565b946020939093013593505050565b6001600160e01b031981168114610fe857600080fd5b50565b600060208284031215610ffd57600080fd5b813561100881610fd2565b9392505050565b60006020828403121561102157600080fd5b5035919050565b6000815180845260005b8181101561104e57602081850181015186830182015201611032565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006110086020830184611028565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156110c0576110c0611081565b604052919050565b600067ffffffffffffffff8211156110e2576110e2611081565b5060051b60200190565b600082601f8301126110fd57600080fd5b8135602061111261110d836110c8565b611097565b82815260059290921b8401810191818101908684111561113157600080fd5b8286015b8481101561114c5780358352918301918301611135565b509695505050505050565b600082601f83011261116857600080fd5b813567ffffffffffffffff81111561118257611182611081565b611195601f8201601f1916602001611097565b8181528460208386010111156111aa57600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a086880312156111df57600080fd5b6111e886610f8c565b94506111f660208701610f8c565b9350604086013567ffffffffffffffff8082111561121357600080fd5b61121f89838a016110ec565b9450606088013591508082111561123557600080fd5b61124189838a016110ec565b9350608088013591508082111561125757600080fd5b5061126488828901611157565b9150509295509295909350565b6000806040838503121561128457600080fd5b823567ffffffffffffffff8082111561129c57600080fd5b818501915085601f8301126112b057600080fd5b813560206112c061110d836110c8565b82815260059290921b840181019181810190898411156112df57600080fd5b948201945b83861015611304576112f586610f8c565b825294820194908201906112e4565b9650508601359250508082111561131a57600080fd5b50611327858286016110ec565b9150509250929050565b600081518084526020808501945080840160005b8381101561136157815187529582019590820190600101611345565b509495945050505050565b6020815260006110086020830184611331565b6000806040838503121561139257600080fd5b50508035926020909101359150565b600080604083850312156113b457600080fd5b82359150602083013567ffffffffffffffff8111156113d257600080fd5b611327858286016110ec565b80358015158114610fa357600080fd5b6000806040838503121561140157600080fd5b61140a83610f8c565b9150611418602084016113de565b90509250929050565b60006020828403121561143357600080fd5b611008826113de565b60008060006060848603121561145157600080fd5b505081359360208301359350604090920135919050565b6000806040838503121561147b57600080fd5b61148483610f8c565b915061141860208401610f8c565b600080600080600060a086880312156114aa57600080fd5b6114b386610f8c565b94506114c160208701610f8c565b93506040860135925060608601359150608086013567ffffffffffffffff8111156114eb57600080fd5b61126488828901611157565b600181811c9082168061150b57607f821691505b60208210810361152b57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60006001820161156f5761156f611547565b5060010190565b60006020828403121561158857600080fd5b5051919050565b808201808211156102d6576102d6611547565b6040815260006115b56040830185611331565b82810360208401526115c78185611331565b95945050505050565b6001600160a01b03868116825285166020820152604081018490526060810183905260a06080820181905260009061160a90830184611028565b979650505050505050565b60006020828403121561162757600080fd5b815161100881610fd2565b6001600160a01b0386811682528516602082015260a06040820181905260009061165e90830186611331565b82810360608401526116708186611331565b905082810360808401526116848185611028565b9897505050505050505056fea264697066735822122004b4ccd4031ea3e6465775f238abb5d699550ab41c93a9c30a9211434b608d9864736f6c6343000814003368747470733a2f2f6261667962656966676e61707534736a7669326664616b6f6b6f6a786969326e6c616d326b7669637971696867376b696b6e737770376171366e752e697066732e6e667473746f726167652e6c696e6b2f7b69647d2e6a736f6e';

    // Transaction parameters for contract deployment
    const txParamsDeployer = {
        nonce: BigInt(nonce++),
        gasPrice: '0x09184e72a000',
        gasLimit: '0x10000000',
        data: bytecode, // Include the bytecode in data field
    };

    let contractAddress: any;

    await Fluence.connect('/ip4/127.0.0.1/tcp/9991/ws/p2p/12D3KooWPC1KeXX7iMdrEuJHeU6h3c43jGRfFQNXdAL4gzS8FzoP', {debug: {printParticleId: true}, 

    keyPair: {type: 'Ed25519', source: new Uint8Array([...])}});

    console.log((await Fluence.getClient()).getPeerId())

    registerVM({
        call: async (tx) => {
            console.log('in vm call')
            const data = abi.simpleEncode("mint(uint256)", 100);
            const priority = Math.floor(Math.random()*10)
            await pq.enqueue(new Transaction(priority, 0, {
                to: contractAddress as any,
                nonce: BigInt(nonce++),
                gasPrice: '0x09184e72a000',
                gasLimit: '0x10000000',
                data: data,
            }));
            return true
        },
        deploy: async() => {
            console.log('deploying...')
            const priority = Math.floor(Math.random()*10)
            await pq.enqueue(new Transaction(priority, 10, txParamsDeployer));
            return true
        }
    })

})();