const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app.js');
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((con) => console.log('Connected to DATABASE'));
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  console.log(`App running ${port}`);
});
