# Bitcoin Core HTTP Integration Testing

For testing https://github.com/bitcoin/bitcoin/pull/32061
with known HTTP clients used with Bitcoin Core.

## Start Bitcoin Core

From the root of this repo, and assuming `bitcoind` is the pull request build:

```
mkdir -p /tmp/http-bitcoin
bitcoind -conf=$(pwd)/bitcoin.conf
```

## NodeJS


### rpc-bitcoin
Original repo: https://github.com/vansergen/rpc-bitcoin

Forked to fix jsonrpc 2.0: https://github.com/GitGab19/rpc-bitcoin

Forked again to build without snyx: https://github.com/pinheadmz/rpc-bitcoin
```
cd js-rpc-bitcoin
npm install
npm test
```