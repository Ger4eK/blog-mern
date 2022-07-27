import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4444',
});

//! кожен раз коли буде робитись запит, буде вшиватись Authorization з токеном - це потрібно для того шоб знати чи наша апка авторизована чи ні
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
