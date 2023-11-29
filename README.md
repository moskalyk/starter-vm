# starter-vm
an evm compatible chain that only grows when you use it, written in typescript

## api
- deployContract(bytecode)
- callContract(mint)
    - have contract addresses peer ids queue transactions in a priority queue based on subjective programming of operators critique of NFTs
    - pull state from automerge
    - perform state update of contract state post transaction queue completion
    - perform state of account state post vm call
- balanceOf(ERC721)
- tx paid in canadian dollars / topup profile with stripe

## tests
- simple timed
- concurrent (state management check)
- scale (time tps)

## details
use automerge to distribute account contract state
