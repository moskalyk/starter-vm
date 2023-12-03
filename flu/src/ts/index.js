import { helloWorld, call, deploy } from './main.js'
import { Fluence } from '@fluencelabs/js-client'

(async () => {
    await Fluence.connect('/ip4/127.0.0.1/tcp/9991/ws/p2p/12D3KooWPC1KeXX7iMdrEuJHeU6h3c43jGRfFQNXdAL4gzS8FzoP')
    
    console.log((await Fluence.getClient()).getPeerId())

    try {
        await deploy("12D3KooWPC1KeXX7iMdrEuJHeU6h3c43jGRfFQNXdAL4gzS8FzoP","12D3KooWHFvc3J3iM8xXkzQhPYbu7FbBBFT3e7yewmSoFq9kGzkY","0x","0x")

        let times = [];
        let totalTime = 0;
        let trials = 30

        for (let i = 0; i < trials; i++) {
            let start = Date.now();
            if(i < 2) await deploy("12D3KooWPC1KeXX7iMdrEuJHeU6h3c43jGRfFQNXdAL4gzS8FzoP","12D3KooWHFvc3J3iM8xXkzQhPYbu7FbBBFT3e7yewmSoFq9kGzkY","0x"+i,"0x")
            const res = await call("12D3KooWPC1KeXX7iMdrEuJHeU6h3c43jGRfFQNXdAL4gzS8FzoP", "12D3KooWHFvc3J3iM8xXkzQhPYbu7FbBBFT3e7yewmSoFq9kGzkY", "0x"+i, "0x");
            let end = Date.now();
            times.push(end - start);
            totalTime += end - start;
        }

        let averageTime = totalTime / times.length; // Average time per transaction in milliseconds
        let transactionsPerSecond = (times.length / totalTime) * 1000; // Convert totalTime to seconds and calculate TPS
        
        console.log(`Average processing time: ${averageTime} ms`);
        console.log(`Transactions per second: ${transactionsPerSecond}`);

    }catch(err){
        console.log(err)
    }
})();