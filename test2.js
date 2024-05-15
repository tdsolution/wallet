window.addEventListener("scroll", ()=>{
  WebViewBridge.send(JSON.stringify({type:"scroll",num:window.pageYOffset}))
});

function getChainID(name) {
switch(name) {
  case 'mainnet': return 1;
  case 'ropsten': return 3;
  case 'rinkeby': return 4;
  case 'kovan': return 42;
}

throw new Error('Unsupport network')
}

function getInfuraRPCURL(chainID, apiKey) {
switch(chainID) {
  case 1: return 'https://mainnet.infura.io/v3/' + apiKey;
  case 3: return 'https://ropsten.infura.io/v3/' + apiKey;
  case 4: return 'https://rinkeby.infura.io/v3/' + apiKey;
  case 42: return 'https://kovan.infura.io/v3/' + apiKey;
}

throw new Error('Unsupport network')
}

function getInfuraWSSURL(chainID, apiKey) {
switch(chainID) {
  case 1: return 'wss://mainnet.infura.io/ws/v3/' + apiKey;
  case 3: return 'wss://ropsten.infura.io/ws/v3/' + apiKey;
  case 4: return 'wss://rinkeby.infura.io/ws/v3/' + apiKey;
  case 42: return 'wss://kovan.infura.io/ws/v3/' + apiKey;
}

throw new Error('Unsupport network')
}

let infuraAPIKey = '${infuraAPIKey}';
let addressHex = '${addressHex}';
let network = '${network}';
let chainID = ${isTomo}?'${settings().web3Link.chainId}' :getChainID(network) ;
let rpcUrl = ${isTomo}?'${settings().web3Link.tomoChain}':getInfuraRPCURL(chainID, infuraAPIKey);
let wssUrl = ${isTomo}?'${settings().web3Link.socket}': getInfuraWSSURL(chainID, infuraAPIKey);


function executeCallback (id, error, value) {
console.log(JSON.stringify(value))
goldenProvider.executeCallback(id, error, value)
}

let goldenProvider = null


function init() {
goldenProvider = new Golden({
  noConflict: true,
  address: addressHex,
  networkVersion: chainID,
  rpcUrl,
  getAccounts: function (cb) {
    cb(null, [addressHex])
  },
  signTransaction: function (tx, cb){
    console.log('signing a transaction', tx)
    const { id = 8888 } = tx
    goldenProvider.addCallback(id, cb)
    const resTx = {name: 'signTransaction', id, tx}
    WebViewBridge.send(JSON.stringify(resTx))
  },
  signMessage: function (msgParams, cb) {
    const { data } = msgParams
    const { id = 8888 } = msgParams
    console.log("signing a message", msgParams)
    goldenProvider.addCallback(id, cb)
    console.log("signMessage")
    const resTx = {name: "signMessage", id, tx}
    WebViewBridge.send(JSON.stringify(resTx))
  },
  signPersonalMessage: function (msgParams, cb) {
    const { data } = msgParams
    const { id = 8888 } = msgParams
    console.log("signing a personal message", msgParams)
    goldenProvider.addCallback(id, cb)
    console.log("signPersonalMessage")
    const resTx = {name: "signPersonalMessage", id, data}
    WebViewBridge.send(JSON.stringify(resTx))
  },
  signTypedMessage: function (msgParams, cb) {
    const { data } = msgParams
    const { id = 8888 } = msgParams
    console.log("signing a typed message", msgParams)
    goldenProvider.addCallback(id, cb)
    console.log("signTypedMessage")
    const resTx = {name: "signTypedMessage", id, tx}
    WebViewBridge.send(JSON.stringify(resTx))
  }
},
{
  address: addressHex,
  networkVersion: chainID
})
  goldenProvider.isTomoWallet = true 
  goldenProvider.isPantoGraph = true
}

init();
window.web3 = new Web3(goldenProvider)

web3.eth.defaultAccount = addressHex

web3.setProvider = function () {
console.debug('Golden Wallet - overrode web3.setProvider')
}

web3.version.getNetwork = function(cb) {
cb(null, chainID)
}
web3.eth.getCoinbase = function(cb) {
return cb(null, addressHex)
}

window.tomoWeb3 = window.web3

tomoWeb3.eth.defaultAccount = addressHex

tomoWeb3.setProvider = function () {
console.debug('Golden Wallet - overrode web3.setProvider')
}

tomoWeb3.version.getNetwork = function(cb) {
cb(null, chainID)
}
tomoWeb3.eth.getCoinbase = function(cb) {
return cb(null, addressHex)
}