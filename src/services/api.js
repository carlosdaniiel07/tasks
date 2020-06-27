const axios = require('axios').default;

let accessToken = null;

const api = axios.create({
  baseURL: 'https://tasks-node.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const setToken = token => {
  accessToken = token;
};

const getAuthHeader = () => {
  return {
    authorization: accessToken,
  };
};

module.exports = {
  api,
  setToken,
  getAuthHeader,
};
