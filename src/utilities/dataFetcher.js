import cacheFactory from './cacheFactory';
import hashGenerator from './hashGenerator';
import axios from 'axios';
const cache = cacheFactory();

const stringifyQuery = function(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

export default function (url, params) {
    let string = url + (params && typeof params === 'object' ? ('?' + stringifyQuery(params)) : ''),
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