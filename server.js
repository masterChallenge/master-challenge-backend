const polka = require('polka');

polka()
  .get('/', (req, res) => {
    res.end('Hello world!');
  })
  .listen(3000, err => {
    if (err) throw err;
    console.log(`> Running on localhost:3000`);
  });