# starter-vm 
an evm compatible chain that only grows when you use it, in js/ts

## api
- deployContract(bytecode, includeContracts: [])
    - check for contract address conflict from contractList
    - find new proof-of-capacity based peerid
    - perform state merge of contract address from prior peer state
    - init state
    - switch router for contract address to new peer id
    - spell expiry of contract (optional) -> =price balance(hardware vs. memory)
- verifyContract(address contractAddress, address mod)
- callContract(mint, includeContracts: [])
    - have contract addresses peer ids queue transactions in a priority queue based on subjective programming of operators critique of NFTs
    - (optional) live state merge per call based on passed in verified contractList
    - downloadURI localhost
- diversityOf(ERC721) -> user count / peerId contract storage count
- balanceOf(ERC721)
- pay(CAD) -> topup profile with stripe

# how to run
- $ cd flu && fluence local up
- $ docker logs fluence-flu-1 | head -n 65 # get node server peer id = ...
- replace in code
- $ cd /src/ts && pnpm i
- replace `source: new Uint8Array([...])` with pkey in router.ts & vm.ts
- open 3 windows
- terminal 1: $ ts-node router.ts
- terminal 2: $ ts-node vm.ts
- terminal 3: $ node index.js

## tests
- simple timed / peer / contract address: ~20-40 tps processed at vm node & ~1-2 tps sequential client requests
- concurrent                                       ____________________________________
- average scale (whats left of tps) peers * simple || peers * blue/green call w/ ttl ||  🙏

# fees
- scale gas to $0.0004 CAD / mint as 107374.1824 / gasUsed = $CAD

# notes
support-vector-machines: In machine learning, SVM is used to classify data by finding the optimal decision boundary that maximally separates different classes of nodes for optimal processing.