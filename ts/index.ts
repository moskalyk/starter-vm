import { VM } from '@ethereumjs/vm';
import { Account, Address, hexToBytes } from '@ethereumjs/util';
import { Common } from '@ethereumjs/common';
import { LegacyTransaction } from '@ethereumjs/tx';
import abi from 'ethereumjs-abi';
import rlp from 'rlp';
import { ethers } from 'ethers';

function calculateContractAddress(senderAddress: string, nonce: number): string {
    // Convert the hex string to a Buffer, removing the '0x' prefix if present
    const senderAddressBuffer = Buffer.from(senderAddress.replace(/^0x/, ''), 'hex');

    // Convert nonce to a hex string and zero-pad it to 32 bytes
    const nonceHex = ethers.utils.hexZeroPad(ethers.utils.hexlify(nonce), 32);
    const nonceBuffer = Buffer.from(nonceHex.slice(2), 'hex'); // Remove '0x' prefix

    const rlpEncoded = rlp.encode([senderAddressBuffer, nonceBuffer]);

    // Convert RLP encoded result to a Buffer if it's not already
    const rlpEncodedBuffer = Buffer.isBuffer(rlpEncoded) ? rlpEncoded : Buffer.from(rlpEncoded);

    // Convert RLP encoded buffer to a hex string
    const rlpEncodedHex = '0x' + rlpEncodedBuffer.toString('hex');

    // Hash the RLP encoded data and extract the contract address
    const contractAddressFull = ethers.utils.keccak256(rlpEncodedHex);
    const contractAddress = '0x' + contractAddressFull.slice(-40);

    return contractAddress;
}

(async () => {

    // Initialize EthereumJS VM
    const common = new Common({ chain: 'mainnet' });
    const vm: any = await VM.create({ common });

    // Create an account with a large balance
    const account = new Account(BigInt(1), BigInt(10048576000000000000100000));
    const caller = new Address(hexToBytes(''))

    // Pre-fund the account
    await vm.stateManager.putAccount(caller, account);

    const privateKey = Buffer.from('', 'hex');

    // deploy a contract
    const bytecode = '0x6080604052600b805462ff00ff19166201000117905534801561002157600080fd5b5061011b806100316000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80630a9254e4146041578063c0406226146043578063f8ccbf47146049575b600080fd5b005b6041606f565b600b54605b9062010000900460ff1681565b604051901515815260200160405180910390f35b7f885cb69240a935d632d79c317109709ecfa91a80626ff3989d68f67f5b1dd12d60001c6001600160a01b031663afc980406040518163ffffffff1660e01b8152600401600060405180830381600087803b15801560cc57600080fd5b505af115801560df573d6000803e3d6000fd5b5050505056fea2646970667358221220066d384258480fedaa2986e4ca95ca8a48b8474cce4eb4f6b211ce6ebe31a89e64736f6c63430008140033';

    // Transaction parameters for contract deployment
    const txParamsDeployer = {
        nonce: '0x1',
        gasPrice: '0x09184e72a000',
        gasLimit: '0x10000000',
        data: bytecode, // Include the bytecode in data field
    };
    
    const contractAddress = calculateContractAddress(caller.toString(), 1);
    console.log(contractAddress)

    const tx2 = LegacyTransaction.fromTxData(txParamsDeployer);
    const signedTx2 = await tx2.sign(privateKey);
    const result2 = await vm.runTx({ tx: signedTx2 });
    console.log(result2)

    // Encode setNumber(uint256)
    const data = abi.simpleEncode("setNumber(uint256)", 123);

    // Transaction parameters for contract deployment
    let txParamsSetState: any = {
        to: contractAddress,
        nonce: '0x2',
        gasPrice: '0x09184e72a000',
        gasLimit: '0x10000000',
        data: data,
    };

    let tx3 = LegacyTransaction.fromTxData(txParamsSetState);
    let signedTx3 = await tx3.sign(privateKey);
    let result3 = await vm.runTx({ tx: signedTx3 });
    console.log(result3)

    // Encode the call to get the number
    const dataGet = abi.simpleEncode("number()");

    // Create a call transaction
    const txParamsGetState = {
        nonce: '0x3',
        to: contractAddress,
        data: dataGet,
        gasPrice: '0x09184e72a000',
        gasLimit: '0x10000000',
    };

    let tx4 = LegacyTransaction.fromTxData(txParamsGetState);
    let signedTx4 = await tx4.sign(privateKey);
    let result4 = await vm.runTx({ tx: signedTx4 });

    // Decode the return value
    const returnedNumber = abi.rawDecode(['uint256'], result4.execResult.returnValue)[0];
    
    console.log('Number:', returnedNumber.toString());
})();