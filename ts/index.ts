import { VM } from '@ethereumjs/vm';
import { Account, Address, hexToBytes, generateAddress } from '@ethereumjs/util';
import { Common } from '@ethereumjs/common';
import { LegacyTransaction } from '@ethereumjs/tx';
import abi from 'ethereumjs-abi';
import { DefaultStateManager } from '@ethereumjs/statemanager'

(async () => {

    // Initialize EthereumJS VM
    const common = new Common({ chain: 'mainnet' });
    const vm: any = await VM.create({ common });

    // Create an account with a large balance
    const account = new Account(BigInt(1), BigInt(10048576000000000000100000));
    const caller = new Address(hexToBytes(''))
    // Pre-fund the account
    await vm.stateManager.putAccount(caller, account);
    
    console.log('DEPLOY')
    const privateKey = Buffer.from('', 'hex');

    // deploy a contract
    const bytecode = '0x6080604052600160005534801561001557600080fd5b5060f7806100246000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80633fb5c1cb1460415780638381f58a146053578063d09de08a14606d575b600080fd5b6051604c3660046083565b600055565b005b605b60005481565b60405190815260200160405180910390f35b6051600080549080607c83609b565b9190505550565b600060208284031215609457600080fd5b5035919050565b60006001820160ba57634e487b7160e01b600052601160045260246000fd5b506001019056fea26469706673582212202ea72742c42c4dc3e0f04dfffa34c545b1c1053d75142dc0caa39caaf9ea5ed964736f6c63430008140033';

    // Transaction parameters for contract deployment
    const txParamsDeployer = {
        nonce: '0x1',
        gasPrice: '0x09184e72a000',
        gasLimit: '0x10000000',
        data: bytecode, // Include the bytecode in data field
    };
    
    const nonce = Uint8Array.from([1]); 
    const tx2 = LegacyTransaction.fromTxData(txParamsDeployer);
    const signedTx2 = await tx2.sign(privateKey);
    const result2 = await vm.runTx({ tx: signedTx2 });

    console.log(result2.createdAddress)

    console.log('SET_NUMBER')
    let start = Date.now()

    // Encode setNumber(uint256)
    const data = abi.simpleEncode("setNumber(uint256)", 123);

    // Transaction parameters for contract deployment
    let txParamsSetState: any = {
        to: result2.createdAddress,
        nonce: '0x2',
        gasPrice: '0x09184e72a000',
        gasLimit: '0x10000000',
        data: data,
    };

    let tx3 = LegacyTransaction.fromTxData(txParamsSetState);
    let signedTx3 = await tx3.sign(privateKey);
    let result3 = await vm.runTx({ tx: signedTx3 });

    console.log('GET_NUMBER')

    // Encode the call to get the number
    const dataGet = abi.simpleEncode("number()");

    const account1 = vm.stateManager.getAccount(caller)
    const trie = vm.stateManager._getStorageTrie(caller, account1)

    const stateManager = new DefaultStateManager({ common: common, trie })
    const vm2: any = await VM.create({ common, stateManager });

    // Create a call transaction
    const txParamsGetState2 = {
        nonce: '0x1',
        to: result2.createdAddress,
        data: dataGet,
        gasPrice: '0x09184e72a000',
        gasLimit: '0x10000000',
    };

    let tx5 = LegacyTransaction.fromTxData(txParamsGetState2);
    let signedTx5 = await tx5.sign(privateKey);
    await vm2.stateManager.putAccount(caller, account);

    let result5 = await vm2.runTx({ tx: signedTx5 });

    // const vm2 = vm.stateManager.({trie})
    let returnedNumber2 = abi.rawDecode(['uint256'], result5.execResult.returnValue)[0];
    console.log('Number:', returnedNumber2.toString());

    let end = Date.now()
    console.log(end - start) // 23
})();