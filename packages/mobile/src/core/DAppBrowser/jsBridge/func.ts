import axios from 'axios';

export function sendRpcRequest(rpcUrl, method, params, id, callback) {
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

  axios(options)
    .then(response => {
      callback(null, response.data);
    })
    .catch(error => {
      callback(error, null);
    });
}