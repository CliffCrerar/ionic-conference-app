
const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const hostName = require('os').hostname();
const path = require('path');

app.use(express.static(path.join(__dirname,'www')))

app.all('*', (req,res, next) => {
    console.log('Request Received')
    next();
})

app.get('/webserver-api', (req,res)=> {
    res.send({message: 'Ionic conference app is running'})
})

app.get('/*', (req,res)=> {
    require('fs').readFile(path.join('www', 'index.html'), (err, file) => {
        if (err) {
            console.log(err);
            res.status(500).type('text').send(err)
            throw err;
        }
        res.type('html').send(file);
    })
})

function startLog() {
    console.log('Server running on ' + hostName + ':' + port)
}

app.listen(port, startLog)
