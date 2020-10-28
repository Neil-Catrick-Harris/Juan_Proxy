const newRelic = require('newrelic');
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/products', express.static(path.join(__dirname, 'public')));

app.get('/products/:productId', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/reviews/products/:productId', (req, res) => {
  axios.get(`http://localhost:3003/api/reviews/products/${req.param('productId')}`).then((results) => {
    res.send(results.data);
  }).catch((error) => {
    res.send(error);
  })
})

app.get('/api/productOptions/products/:productId', (req, res) => {
  axios.get(`http://localhost:3000/api/productOptions/products/${req.param('productId')}`).then((results) => {
    res.send(results.data);
  }).catch((error) => {
    res.send(error);
  })
})

app.get('/api/similarProducts/products/:productId', (req, res) => {
  axios.get(`http://localhost:3001/api/similarProducts/products/${req.param('productId')}`).then((results) => {
    res.send(results.data);
  }).catch((error) => {
    res.send(error);
  })
})

app.get('/api/productView/products/:productId', (req, res) => {
  axios.get(`http://localhost:3002/api/productView/products/${req.param('productId')}`).then((results) => {
    res.send(results.data);
  }).catch((error) => {
    res.send(error);
  })
})


app.listen(PORT, () => {
  console.log('listening on port: ' + PORT);
})
