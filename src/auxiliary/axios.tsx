import axios from 'axios';
import store from '../redux/store';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

instance.interceptors.request.use(function (config) {
    const {accessToken, clientID, uid} = store.getState().token;

    config.headers['access-token'] = localStorage.getItem('accessToken') || accessToken;
    config.headers['client'] = localStorage.getItem('clientID') || clientID;
    config.headers['uid'] = localStorage.getItem('uid') || uid;
    return config;
}, function (error) {
    console.log(error.response)
    return Promise.reject(error);
});

export default instance;