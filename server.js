var express = require('express')
var app = express()

app.use(express.static('build'));

app.listen(3000, function () {
    console.log('http://localhost:3000/in-browser.html');
    console.log('http://localhost:3000/in-worker.html');
});
