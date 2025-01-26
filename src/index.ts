import express from 'express';

import envConfig from './config/envConfig';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(envConfig.PORT, () => {
  console.log(`Server started at http://localhost:${port}`);
}); 
