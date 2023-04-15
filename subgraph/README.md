Deployed here: https://thegraph.com/hosted-service/subgraph/spennyp/eth-tokyo-hackathon

Source .env

```
source .env
```

Authenticate

```
graph auth --product hosted-service ${GRAPH_DEPLOY_KEY}
```

Deploy

```
graph deploy --product hosted-service spennyp/eth-tokyo-hackathon
```
