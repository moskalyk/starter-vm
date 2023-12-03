import { helloWorld, registerMutexAddressRouter, registerVM } from './main.js'
import { Fluence } from '@fluencelabs/js-client'

function addressToIndex(address: string, mod: number) {
    let sum = 0;
    for (let i = 0; i < address.length; i++) {
        sum += address.charCodeAt(i);
    }
    return sum % mod;
}

(async () => {
    await Fluence.connect('/ip4/127.0.0.1/tcp/9991/ws/p2p/12D3KooWPC1KeXX7iMdrEuJHeU6h3c43jGRfFQNXdAL4gzS8FzoP', {debug: {printParticleId: true}, keyPair: {type: 'Ed25519', source: new Uint8Array([
        ...])}});

    console.log((await Fluence.getClient()).getPeerId())

    registerMutexAddressRouter({
        route: async (contractAddress: any) => {
            console.log(contractAddress)
            const peers = ['12D3KooWSiFgihj5CKEwJDHs9weKwbjgZsGJEnjYKaWFZ61rBF1A','12D3KooWFEUEQPKb899s9fDdRU4RL3zjBVf9adNto3oVGo18JTUn']
            const peer = peers[addressToIndex(contractAddress, peers.length)]
            return peer
        }
    })
})();