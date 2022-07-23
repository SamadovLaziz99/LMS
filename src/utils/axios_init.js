import axios from "axios";

const _request = function (method, url, data, params) {
    const config = {
        method: method,
        url: url,
        data: data,
        params: params,
        baseURL: 'https://lmspro-uz.herokuapp.com/api'
    }
    if (localStorage.getItem('token')) {
        config.headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }

    const result = axios(config);

    return new Promise((resolve, reject) => {
        result.then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err)
            console.error('bla bla :', err);
        });
    })
}

const get = function (url, params) { return _request('get', url, undefined, params) };
const post = function (url, data, params) { return _request('post', url, data, params)};
const put = function (url, data, params) { return _request('put', url, data, params) };
const remove = function (url, params) { return _request('delete', url, undefined, params) };

export default { get, post, put, remove };