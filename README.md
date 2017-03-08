See http://stackoverflow.com/questions/42660581/microtasks-inside-web-workers for the problem I'm trying to solve here.

To see an example of the problem in action, clone this repo and then:

    $ npm install
    $ npm start

Go to http://localhost:3000/in-browser.html in your browser and open the JS console, you will see something like:

    app.js:19 got Object {id: 1}
    app.js:19 got Object {id: 2}
    app.js:38 tx complete

But go to http://localhost:3000/in-worker.html and the same code will run inside a Web Worker, sadly producing this output:

    app.js:17 Uncaught DOMException: Failed to execute 'get' on 'IDBObjectStore': The transaction is not active.
        at http://localhost:3000/app.js:17:46
        at Item.run (http://localhost:3000/app.js:117:12)
        at MessagePort.nextTick (http://localhost:3000/app.js:88:32)
    app.js:38 tx complete

How can I make it work inside a Web Worker??
