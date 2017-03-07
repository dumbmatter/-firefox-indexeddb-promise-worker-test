var immediate = require('immediate');

var openRequest = indexedDB.open('firefox-indexeddb-promise-worker-test');

openRequest.onupgradeneeded = function() {
    var db = openRequest.result;
    var store = db.createObjectStore('whatever', {keyPath: 'id'});

    store.put({id: 1});
    store.put({id: 2});
    store.put({id: 3});
};

function get(tx, id, cb) {
    immediate(function () {
        var req = tx.objectStore('whatever').get(id);
        req.onsuccess = function (e) {
            console.log('got', e.target.result);
            if (cb) {
                cb(null, e.target.result);
            }
        };
        req.onerror = function (e) {
            console.error(e.target.error);
            if (cb) {
                cb(e.target.error);
            }
        };
    });
}

openRequest.onsuccess = function() {
    var db = openRequest.result;

    var tx = db.transaction('whatever');
    tx.oncomplete = function () {
        console.log('tx complete');
    };

    get(tx, 1, function () {
        get(tx, 2);
    });
};
