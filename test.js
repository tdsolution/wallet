import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import settings from 'controller/settings'
import WebView from 'react-native-webview-bridge-updated/webview-bridge'

export default class GoldenDWebBrowser extends Component {
  onBridgeMessage = (resTX) => {
    let payload = {}
    try {
      payload = JSON.parse(resTX)
    } catch (error) {
      console.log(error)
    }

    if (payload.type === 'scroll') {
      if (typeof payload.num === 'number') {
        this.props.onScroll(payload.num)
      }
    } else {
      if (payload.name === 'signTransaction'  payload.name === 'signMessage'  payload.name === 'signPersonalMessage' || payload.name === 'signTypedMessage') {
        this.props.onSignPersonalMessage(payload)
      }
    }
  }

  executeCallback (id, error, value) {
    const v = (typeof value === 'object') ? JSON.stringify(value) : ${value}
    const e = error ? '${error}' : 'null'

    this.webview.sendToBridge(executeCallback(${id}, ${e}, '${v}'))
  }

  scrollToTop () {
    this.webview.scrollTo({ x: 0, y: 0 })
  }

  goBack () {
    this.webview.goBack()
  }

  goForward () {
    this.webview.goForward()
  }

  reload () {
    console.log('reload android')
    this.webview.reload()
  }

  loadSource (url) {
    this.webview.loadSource(url)
  }

  render () {
    const {
      uri,
      addressHex,
      network,
      infuraAPIKey,
      jsContent,
      onError,
      onLoadEnd,
      isTomo,
      onNavigationStateChange
    } = this.props

    return (
      <WebView
        ref={(ref) => { this.webview = ref }}
        {...onNavigationStateChange ? { onNavigationStateChange } : null}
        onBridgeMessage={this.onBridgeMessage}
        javaScriptEnabled
        thirdPartyCookiesEnabled
        onError={onError}
        allowUniversalAccessFromFileURLs
        injectedOnStartLoadingJavaScript={getJavascript(addressHex, network, infuraAPIKey, jsContent, isTomo)}
        source={uri}
        style={styles.container}
        onLoadEnd={onLoadEnd}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  }
})

const getJavascript = function (addressHex, network, infuraAPIKey, jsContent, isTomo) {
  // return window.test = () => alert('AAA')
  return `
    ${jsContent}

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


  `
}