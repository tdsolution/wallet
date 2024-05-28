import axios from 'axios';

export function sendRpcRequest(rpcUrl, method, params, id) {
  const options = {
    method: 'POST',
    url: rpcUrl,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      "jsonrpc": "2.0",
      "method": method,
      "params": params,
      "id": id
    }
  };

  return axios(options)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}