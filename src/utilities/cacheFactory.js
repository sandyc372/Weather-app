import localforage from 'localforage';
export default function () {
    return {
        _getItem: function (key) {
            return new Promise((resolve, reject) => {
                localforage.getItem(key)
                    .then((data) => {
                        if (data && ((Date.now() - data.timestamp) <= 10 * 60 * 1000))
                            resolve(data.data);
                        else {
                            localforage.removeItem(key).finally(() => resolve(null))
                        }
                    }, (err) => {
                        reject(err)
                    })
            });
        },
        _setItem: function (key, value) {
            return localforage.setItem(key, value);
        },
        _removeItem: function (key) {
            return localforage.removeItem(key);
        },
        _purge: function () {
            return localforage.clear();
        }
    }
}