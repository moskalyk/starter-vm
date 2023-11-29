import { helloWorld, call } from './main.js'
import { Fluence } from '@fluencelabs/js-client'

(async () => {
    await Fluence.connect('/ip4/127.0.0.1/tcp/9991/ws/p2p/12D3KooWPC1KeXX7iMdrEuJHeU6h3c43jGRfFQNXdAL4gzS8FzoP')
    console.log((await Fluence.getClient()).getPeerId())

    const res = await call("","0x","0x")
    console.log(res)
})();