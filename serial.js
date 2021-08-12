const bindings   = require('@serialport/bindings');
const SerialPort = require('serialport');
const Readline   = require('@serialport/parser-readline');

function getPortsList(callback){
    
  bindings.list().then(ports=>{
    console.log('ports',ports);
  }); 
};

function connectToPort(portname,baudrate){

  let port;

  try{

    port = new SerialPort(portname,{
      baudRate: baudrate
    });

  }catch(err){
    console.log(err);
    return false;
  }
 

  const parser = new Readline();
  port.pipe(parser);

  return port;
}

module.exports = {
  getPortsList,
  connectToPort
};