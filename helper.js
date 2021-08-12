const fs = require('fs');

let _fragments = {};

function fragment(path,data){

    let file = 'html/'+path;
   
    //if(typeof _fragments[file] == 'undefined'){

        try{
            _fragments[file] = fs.readFileSync(file,'utf8');
           
        }catch(err){
            console.log('Error',err);
            return false;
        }
       
    //}

    if(typeof data == 'undefined'){
        data = {};
    }

    let frag = _fragments[file];

    for(let key in data){
        frag = frag.replaceAll("{{"+key.trim()+"}}", data[key]);
    }

    frag = frag.replaceAll(/\{\{(.*)\}\}/g,'');

    return frag;
}

function serveHTML(res,text){
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(text));
}


module.exports = {fragment,serveHTML};