import axios from "axios";
import apiConfig from  "../config/api";

const isString = val => typeof val === 'string';

const customHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer '+localStorage.getItem('access_token') || undefined
  };

const axos = axios.create({
                  baseURL: "http://localhost:4000/",
                  responseType: "json",
                  headers: customHeaders
              });

const process = (method, url, data = {}) => {
    let body = {};
    return new Promise((resolve, reject) => {
      try {
        let req = null;
        if ( !isString(url) || !url.length ) {
            throw new Error('Not a valid url');
        }
        method = method.toLowerCase();
        url = url.indexOf('/') === 0 ? url.substr(1) : url;
        if (method !== 'get') {
          body = data;
          req = axos[method](`${apiConfig.fetchUrl}${url}`, body);
        } else {
          req = axos[method](`${apiConfig.fetchUrl}${url}`);
        }
        req.then(r => r)
        req.then(res => {
          let { data } = res;
          data = {...data, status: res.status};
          resolve(data);
        })  
        .catch(err => {
          throw Error(err)
        })
      }catch ( err ) {
        reject({ message: err.message, status: 500 });
      }
    });
}

const api = {};

['get', 'post', 'patch', 'delete'].forEach(method => {
  api[method] = process.bind(null, method)
})

export default api;