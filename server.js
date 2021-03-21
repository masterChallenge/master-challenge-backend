const polka = require('polka');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const uriMongo = process.env.DRIVER;
const MongoClient = require('mongodb').MongoClient;
let mongodb;

MongoClient.connect(uriMongo, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
}, (err, database) => {
  if (err) return console.error(err);
  console.log('Connected to Database');
  mongodb = database;
});

const app = polka();

app.get('/', (req, res) => {
  res.end('Hello world!');
});


app.get('/challenges/:pid', (req, res) => {
  const data = mongodb.db('swat-mco');
  const pid = req.params.pid

  data.collection('challenges')
    .findOne({
      challengeId : parseInt(pid)
    })
    .then((result)=>{
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(result))
    })
    .catch(err => console.log(err))
});

app.get('/challenges', (req, res) => {
  const data = mongodb.db('swat-mco');

  data.collection('challenges')
    .find({})
    .toArray()
    .then((result)=>{
      //console.log(result)
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(result))
    })
    .catch(err => console.log(err))
});

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${PORT}`);
  });