import axios from 'axios';

const productionHost = 'https://stonks369.herokuapp.com/';
const localHost = 'http://localhost:1111/';

const instance = axios.create({
  baseURL: localHost,
});

export default instance;
