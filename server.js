const polka = require('polka');
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

app.get('/users', (req, res) => {
  const data = mongodb.db('testdb');

  data.collection('colltest')
    .findOne()
    .then((result)=>{
      console.log(result)
      res.end(JSON.stringify(result))
    })
    .catch(err => console.log(err))
  
});

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${PORT}`);
  });