import { helloWorld, registerVM } from './main.js'
import { Fluence } from '@fluencelabs/js-client'

const wait = (ms: number) => new Promise(res => setTimeout(() => res, ms));

(async () => {
    await Fluence.connect('/ip4/127.0.0.1/tcp/9991/ws/p2p/12D3KooWPC1KeXX7iMdrEuJHeU6h3c43jGRfFQNXdAL4gzS8FzoP', {debug: {printParticleId: true}, keyPair: {type: 'Ed25519', source: new Uint8Array()}});
    console.log((await Fluence.getClient()).getPeerId())
    // console.log(res)
    let mutex = false;

    registerVM({
        call: async (tx) => {
            console.log('in vm call')
            console.log(tx)

            // set is inProgress
            mutex = true;
            wait(2000*Math.random())
            // add to transaction queue

            // pull from automerge

            // rehydrate from json parse of vm

            // run call code

            // update account tree

            // only if transaction queue is empty
            // update automerge with stringified vm
            // return result
            return true
        },
        inProgress: async() => {
            console.log(mutex)
            return mutex
        }
    })

})();