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

// Usage example:
const senderAddress = ''; // Replace with the sender's address
const nonce = 1; // The nonce used for the transaction
const contractAddress = calculateContractAddress(senderAddress, nonce);

console.log('Contract Address:', contractAddress);
