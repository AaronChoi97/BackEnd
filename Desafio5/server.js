const express = require('express');
const router = require("./routes/router");
const path=require ("path")
const {engine}=require("express-handlebars")

const products = require('./api/claseProducto');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', router);

app.engine("handlebars", engine())

app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));



app.get('/', (req, res) => {
    res.render('form')
  })


app.get('/productos', (req, res) => {
    let productos = products.getAllProducts()
    res.render('products', { productos })
})



const PORT = 8080;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));