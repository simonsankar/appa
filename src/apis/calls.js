import axios from 'axios';
import store from '../store';
import {API_URL} from 'react-native-dotenv';

export const eventsApi = axios.create({
  baseURL: API_URL,
});

eventsApi.interceptors.request.use(
  function(config) {
    const {token, applicationId, eventCount} = store.getState();
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.ETag = `${applicationId}.${eventCount}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);
