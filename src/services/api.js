const axios = require('axios').default;

const api = axios.create({
  baseURL: 'https://tasks-node.herokuapp.com',
  headers: {
    authorization: 'Bearer TOKEN_HERE',
  },
});

module.exports = api;
