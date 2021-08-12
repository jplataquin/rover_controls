let serialport = require('serialport');
 
// list serial ports:
serialport.list().then (ports=>{

    console.log(ports);
})
