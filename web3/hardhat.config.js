require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    zksync_testnet: {
      url: "https://rpc.sepolia.dev",
      ethNetwork: "SepoliaETH",
      chainId: 11155111,
      zksync: true,
    },
    zksync_mainnet: {
      url: "https://zksync2-mainnet.zksync.io/",
      ethNetwork: "mainnet",
      chainId: 324,
      zksync: true,
    },
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    defaultNetwork: 'SepoliaETH',
    networks:{
      hardhat:{},
      SepoliaETH:{
        url:'https://rpc.sepolia.dev',
        accounts: ['0x${process.env.PRIVATE_KEY}']

      }


    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
