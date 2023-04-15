# Running locally

Run anvil

```
anvil --fork-url https://eth-goerli.g.alchemy.com/v2/<api_key> --chain-id 1337
```

Deploy to anvil

```
forge create --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/PeerToPeerLoans.sol:PeerToPeerLoans
```

# Running tests

```
forge test
```

# Depoy

Source .env

```
source ./env
```

## Deploy and verify polygon

```
forge create PeerToPeerLoans --contracts src/PeerToPeerLoans.sol --private-key ${PRIVATE_KEY} --rpc-url ${POLYGON_RPC_URL} --etherscan-api-key ${POLYGONSCAN_API_KEY} --verify
```

# Deploy to scroll

```
forge create PeerToPeerLoans --contracts src/PeerToPeerLoans.sol --private-key ${PRIVATE_KEY} --rpc-url https://alpha-rpc.scroll.io/12
```

```
forge verify-contract 0xb624967319d5075a90a2a5Ab302A9DFD772d3Cc7 src/PeerToPeerLoans.sol:PeerToPeerLoans --chain-id 534353 --verifier-url https://blockscout.scroll.io/api --verifier blockscout
```

# Deploy to Gnosis

```
forge create --rpc-url https://rpc.gnosischain.com --private-key ${PRIVATE_KEY} src/PeerToPeerLoans.sol:PeerToPeerLoans --etherscan-api-key ${GNOSIS_API_KEY} --verify
```

```
forge verify-contract 0xb624967319d5075a90a2a5Ab302A9DFD772d3Cc7 src/PeerToPeerLoans.sol:PeerToPeerLoans --chain-id 534353 --verifier-url https://blockscout.scroll.io/api --verifier blockscout
```

```
forge create PeerToPeerLoans --contracts src/PeerToPeerLoans.sol --private-key ${PRIVATE_KEY} --rpc-url https://rpc.gnosischain.com --etherscan-api-key ${GNOSIS_API_KEY} --verify
```

```
forge create --rpc-url https://rpc.gnosischain.com \
    --private-key ${PRIVATE_KEY} src/PeerToPeerLoans.sol:PeerToPeerLoans \
    --etherscan-api-key ${GNOSIS_API_KEY} \
    --verify
```

```
forge verify-contract \
    --chain-id 100 \
    --num-of-optimizations 200 \
    --watch \
    --etherscan-api-key ${GNOSIS_API_KEY} \
    --compiler-version v0.8.17+commit.8df45f5f \
    0xEA4aD7964B05E09c1709319e826aAC07ea076De9 \
    src/PeerToPeerLoans.sol:PeerToPeerLoans
```
