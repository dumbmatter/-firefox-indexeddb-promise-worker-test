var Dexie = require('dexie');

var openRequest = indexedDB.open('firefox-indexeddb-promise-worker-test');

openRequest.onupgradeneeded = function() {
    var db = openRequest.result;
    var store = db.createObjectStore('whatever', {keyPath: 'id'});

    store.put({id: 1});
    store.put({id: 2});
    store.put({id: 3});
};

function get(tx, id) {
    return new Dexie.Promise(function (resolve, reject) {
        var req = tx.objectStore('whatever').get(id);
        req.onsuccess = function (e) {
            console.log('got', e.target.result);
            resolve(e.target.result);
        };
        req.onerror = function (e) {
            reject(e.target.error);
        };
    })
}

openRequest.onsuccess = function() {
    var db = openRequest.result;

    var tx = db.transaction('whatever');
    tx.oncomplete = function () {
        console.log('tx complete');
    };

    get(tx, 1).then(function () {
        return get(tx, 2);
    }).catch(function (err) {
        console.error(err);
    });
};
