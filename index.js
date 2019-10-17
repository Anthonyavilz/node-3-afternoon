require('dotenv').config();
const express = require('express');
const massive = require('massive');
const { SERVER_PORT, CONNECTION_STRING } = process.env;
const { create, getAll, getOne, update, deleteOne } = require('./product_controller');

const app = express();

massive(CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance);
        console.log('database running');
    })
    .catch(err => console.log(err));

app.use(express.json());

app.post('/api/products', create)
app.get('/api/products', getAll)
app.get('/api/products/:id', getOne)
app.put('/api/products/:id', update)
app.delete('/api/products/:id', deleteOne)

app.listen(SERVER_PORT, () => {
    console.log(`Serving on port ${SERVER_PORT}`);
});