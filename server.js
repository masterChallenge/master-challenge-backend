const polka = require('polka');
const PORT = process.env.PORT || 5000;

polka()
  .get('/', (req, res) => {
    res.end('Hello world!');
  })
  .listen(PORT, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${PORT}`);
  });