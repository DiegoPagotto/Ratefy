import axios from 'axios';
import config from '../config.json';

const instance = axios.create({
  baseURL: config.backEndUrl, 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;