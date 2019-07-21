/*
* @desc Token Name: Sultan Chain (STN)
* @author mangadul
* Token Info: https://etherscan.io/token/0xdd1cb27bcf5b6129ed0b8b507ccd9633fa0081fe
* ---------------------------
* command:
* ---------------------------
* truffle compile
* truffle migrate --network live
* truffle run verify SultanChain --network live
* ---------------------------
 */

var HDWalletProvider = require("truffle-hdwallet-provider");
var NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker")

module.exports = {
  networks: {
    live: {
      provider: function () {
        var wallet = new HDWalletProvider(process.env.MNEMONIC_OR_PRIVATE_KEY, `https://mainnet.infura.io/v3/${process.env.INFURA_ACCESS_TOKEN}`)
        var nonceTracker = new NonceTrackerSubprovider()
        wallet.engine._providers.unshift(nonceTracker)
        nonceTracker.setEngine(wallet.engine)
        return wallet
      },
      network_id: "1",      
      gas: process.env.GASFEE,
      gasPrice: process.env.GASPRICE,
      timeoutBlocks: 200,
      skipDryRun: true 
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API
  }    
};