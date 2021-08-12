const {getPortsList,connectToPort} = require('./serial.js');


function websocketHandler(server){

    const io      = require("socket.io")(server);

    let portObject = false;
    let connectedPort = '';

    io.sockets.on('connection', socket => {

        socket.on('connectToPort',(port,callback)=>{

            if(!portObject){

                portObject = connectToPort(port,9600);
                
                setTimeout(()=>{
                    connectedPort = port;
                    callback('Connected to port '+port);
                }, 1000);
                
            
            }else{
                callback('Already connected to'+connectedPort);
            }
            
        });

        socket.on('command', (command,callback) => {

            if(portObject){
                portObject.write(command);
                callback(command);
            }else{
               callback(false);
            }
        });

        socket.on('status',(callback)=>{
            
            if(!portObject){
                callback('Not connected');
            }else{
                callback('Already connected to'+connectedPort);
            }
        });

    });//connection

}


module.exports = websocketHandler;