import cacheFactory from './cacheFactory';
import hashGenerator from './hashGenerator';
import queryString from 'query-string';
import axios from 'axios';
const cache = cacheFactory();

export default function (url, params) {
    let string = url + (params && typeof params === 'object' ? ('?' + queryString.stringify(params)) : ''),
        hash = hashGenerator(string).toString();
    console.log(string, hash);

    //get item from cache
    return new Promise((resolve, reject) => {
        cache._getItem(hash)
            .then((data) => {
                if (data) resolve(data);
                else {
                    //cache miss, perform the request
                    axios.get(url, {
                        params: params
                    }).then((response) => {
                        //cache the response and resolve the promise
                        cache._setItem(hash, {data: response.data, timestamp: Date.now()})
                            .finally(() => resolve(response.data));

                    }, (err) => {
                        reject(err)
                    })
                }
            }, (err) => {
                //cache error, perform the request
                axios.get(url, {
                    params: params
                }).then((response) => {
                    //cache the response and resolve the promise
                    cache._setItem(hash, {data: response.data, timestamp: Date.now()})
                        .finally(() => resolve(response.data));
                }, (err) => {
                    reject(err)
                })
            })
    })

}