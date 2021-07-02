const http = require('http');
const {MongoClient} = require('mongodb')
// import pass from './password.mjs'



async function main(document, collect){
  /**
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = `mongodb+srv://Sarunas:<password>@clustersaras.ztkk7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
      // Connect to the MongoDB cluster
      await client.connect();
      await client.db("ibm").collection(collect).insertOne(document)
  } catch (e) {
         console.error(e);
  } finally {
      await client.close();
  }
}

const server = http.createServer((req,res)=>{
    let body='';
    req.on('data', chunk => {
        body+=chunk;
      })
   
    req.on('end', () => {
      if(body){
        let {search, cardClicked}=JSON.parse(body);
        if(search){
          let time = new Date();
          console.log(time, "searched for: ", search)
          /*
          writing search to mongoDB
          */
          main({[time] : search},"search").catch(console.error); 
        }
        if(cardClicked){
          let time = new Date();
          console.log(time, "card was clicked: ", cardClicked)
          
          let data = JSON.stringify(cardClicked)
                    /*
          writing cardClicked object to mongoDB
          */
          main({[time] : cardClicked},"cardClicked").catch(console.error); 
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
