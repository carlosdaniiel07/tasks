const axios = require('axios').default;

let accessToken = null;
let user = null;

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

const setUser = userData => {
  user = userData;
};

const getUser = () => {
  return user;
};

module.exports = {
  api,
  setToken,
  getAuthHeader,
  setUser,
  getUser,
};
