'use strict';
const http = require('http');
require('dotenv').config();
require("./config/db.mongoose");

const reqHandle = require('./config/router');


const server = http.createServer(function(req, res){
    if(req.method === 'POST') {
        reqHandle.handlePOST(req, res);
    } else if(req.method === 'GET') {
        reqHandle.handleGET(req, res);
    }
}) 

const port = process.env.PORT || 3000;
const host = process.env.HOST;

server.listen(port, host);

