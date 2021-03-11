import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:1111/'
});

export default instance;