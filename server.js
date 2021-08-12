const express   = require("express");

//const cors 		= require('cors');
const https     = require("https");
const http      = require("http");
const app       = express();

const {fragment,serveHTML} = require('./helper.js');
const websocketHandler = require('./websockets.js');

const server  = http.createServer(app);

websocketHandler(server);

app.use('/public',express.static(__dirname + "/public"));
app.use('/adarna',express.static(__dirname + "/node_modules/adarna"));


app.get('/', function(req, res) {
    
    let frag = fragment('index.html');

    serveHTML(res,frag);
});




let port = 8004;
server.listen(port, () => console.log(`Server is running on port ${port}`));
