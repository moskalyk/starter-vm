import { helloWorld, registerMutexAddressRouter, registerVM } from './main.js'
import { Fluence } from '@fluencelabs/js-client'

(async () => {
    await Fluence.connect('/ip4/127.0.0.1/tcp/9991/ws/p2p/12D3KooWPC1KeXX7iMdrEuJHeU6h3c43jGRfFQNXdAL4gzS8FzoP', {debug: {printParticleId: true}, keyPair: {type: 'Ed25519', source: new Uint8Array()}});

    console.log((await Fluence.getClient()).getPeerId())
    const activeList = []

    registerMutexAddressRouter({
        route: async (contractAddress: any) => {
            // priority: contractAddress, from, to
            // activeList.push(addressList)

            // get peers
            const peer = '12D3KooWLVHWWw9ux9oZp5QTkD8UZDEe4ouwrPaFYARexLVY3Z5g'
            // check network and see if a peer contains contract address in progress
            // 

            // if empty, route node based on contract address evm router hash
            // if contains, return to

            return peer
        },
        // contains: async (address: string) => {
        //     return activeList.contains(address)
        // },
        // active: async () => {
        //     return activeList
        // },
        // finish: async (addressList: string) => {
        //     // remove addressess from lists
        // }
    })
})();