/* eslint-env mocha */
'use strict';

const { RPCClient, RESTClient } = require('rpc-bitcoin-pinheadmz');
const url = 'http://127.0.0.1';
const user = 'u';
const pass = 'p';
const port = 18443;
const timeout = 10000;

const client = new RPCClient({ url, port, timeout, user, pass });
const restClient = new RESTClient({ url, port, timeout });

const blockhash =
  '0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206';
const height = 0;
const wallet_name = `wallet-${Date.now()}`;

describe('rpc-bitcoin', () => {
  it('batch rpc request', async () => {
    const response = await client.batch([
      { method: 'getbestblockhash', id: 1 },
      { method: 'help', params: { command: 'help' }, id: 'custom-id' },
      { method: 'getzmqnotifications', params: {}, id: 2 },
    ]);
    console.log(response);
  });

  it('getbestblockhash', async () => {
    const hex = await client.getbestblockhash();
    console.log(hex);
  });

  it('getblock', async () => {
    {
      const verbosity = 2;
      const block = await client.getblock({ blockhash, verbosity });
      console.log(block);
    }
  });

  it('blockchaininfo', async () => {
    const info = await client.getblockchaininfo();
    console.log(info);
  });

  it('blockcount', async () => {
    const count = await client.getblockcount();
    console.log(count);
  });

  it('blockfilter', async () => {
    {
      const filtertype = 'basic';
      const result = await client.getblockfilter({ blockhash, filtertype });
      console.log(result);
    }
  });

  it('blockhash', async () => {
    const hash = await client.getblockhash({ height });
    console.log(hash);
  });

  it('simple rpc requests', async () => {
    const verbose = false;
    const header = await client.getblockheader({ blockhash, verbose });
    console.log(header);
  });

  it('blockstats', async () => {
    {
      const hash_or_height = blockhash;
      const stats = ['txs', 'time'];
      const info = await client.getblockstats({ hash_or_height, stats });
      console.log(info);
    }
  });

  it('chaintips', async () => {
    const tips = await client.getchaintips();
    console.log(tips);
  });

  it('difficulty', async () => {
    const difficulty = await client.getdifficulty();
    console.log(difficulty);
  });

  it('wallet', async () => {
    {
      const disable_private_keys = true;
      const blank = true;
      const result = await client.createwallet({
        wallet_name,
        disable_private_keys,
        blank,
      });
      console.log(result);
    }
  });

  it('miner', async () => {
    {
      const nblocks = 10;
      const maxtries = 10000;
      const address = 'bcrt1qq024unfkkjhrweqv75e977ehpepvnuxrynx2ah';
      const result = await client.generatetoaddress(
        { nblocks, address, maxtries },
        wallet_name
      );
      console.log(result);
    }
  });

  it('chaintxstats', async () => {
    {
      const hex = await client.getbestblockhash();
      const nblocks = 1;
      const result = await client.getchaintxstats({ nblocks, hex });
      console.log(result);
    }
  });

  it('rest: getblock', async () => {
    {
      const hash = await client.getbestblockhash();
      const format = 'hex';
      const result = await restClient.getBlock({ hash, format });
      console.log(result);
    }
  });

  it('rest: getblocknotxdetails', async () => {
    {
      const hash = await client.getbestblockhash();
      const format = 'hex';
      const result = await restClient.getBlockNoTxDetails({ hash, format });
      console.log(result);
    }
  });

  it('rest: getblockhashbyheight', async () => {
    {
      const height = 1;
      const format = 'hex';
      const result = await restClient.getBlockHashByHeight({ height, format });
      console.log(result);
    }
  });

  it('rest: chaininfo', async () => {
    const result = await restClient.getChainInfo();
    console.log(result);
  });

  it('rest: getutxos', async () => {
    {
      const checkmempool = true;
      const outpoints = [
        {
          txid: 'e346be6c1ef4d24f3a26ea8e1b45a2645d339fbee9da8b9dc03aeef1c4179716',
          n: 0,
        },
        {
          txid: 'e346be6c1ef4d24f3a26ea8e1b45a2645d339fbee9da8b9dc03aeef1c4179716',
          n: 1,
        },
      ];
      const format = 'hex';
      const result = await restClient.getUtxos({ checkmempool, outpoints, format });
      console.log(result);
    }
  });
});
