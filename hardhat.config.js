require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    // sepolia: {
    //   url: "https://rpc.sepolia-testnet.com",
    //   accounts: ['0x4b3222225f4a813462726f9aa075c24a7df34fda0e9bd6bb55d55823ae1fad76']
    // }
  },
  solidity: {
    version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: './src/contracts',
    artifacts: './src/abis',
  },
  mocha: {
    timeout: 40000,
  },
}
