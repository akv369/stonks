import axios from 'axios';

const productionHost = 'https://stonks369.herokuapp.com/';
const localHost = 'http://localhost:1111/';

const instance = axios.create({
  baseURL: productionHost,
});

export default instance;
