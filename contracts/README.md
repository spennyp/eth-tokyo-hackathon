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

# Deploy to Polygon

Source .env

```
source ./env
```

Deploy and verify

```
forge create PeerToPeerLoans --contracts src/PeerToPeerLoans.sol --private-key ${PRIVATE_KEY} --rpc-url ${POLYGON_RPC_URL} --etherscan-api-key ${POLYGONSCAN_API_KEY} --verify
```
