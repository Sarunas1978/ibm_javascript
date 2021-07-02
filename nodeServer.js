const http = require('http');

const server = http.createServer((req,res)=>{

    
    let body='';
    req.on('data', chunk => {
        body+=chunk;
      })
   
    req.on('end', () => {
      if(body){
        let {search, cardClicked}=JSON.parse(body);
        if(search){
          console.log(new Date(), "searched for: ", search) 
        }
        if(cardClicked){
          console.log(new Date(), "card was clicked: ", cardClicked)
        }
      } 
    })
    res.writeHead(200, { 'Content-Type': 'application/json',
                           'Access-Control-Allow-Origin' : 'http://localhost:3000',
                           'Vary' : 'Origin',
                           'Access-Control-Allow-Methods' : 'POST',
                           'Access-Control-Allow-Headers': 'Content-Type'
                         });
    res.write(JSON.stringify({result : `server is running!`}))

    res.end();

})

server.listen(8080);
