'user strict'

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Product = require('./models/product');
mongoose.set('debug', true);

const app= express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.get('/api/product', (req, res)=>{
Product.find({}, (err, products)=>{
	if(err) return res.status(500).send({message: `Error al realizar la peticion ${err}`})
		if(!products) return res.status(404).send({message: 'No existen los productos'})

			res.status(200).send({products});
})
})

app.get('/api/product/:productId', (req, res)=>{
let productId = req.params.productId

Product.findById(productId, (err, product)=>{
	if(err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
	if (!product) return res.status(400).send({message: 'El producto no existe'})
	res.status(200).send({product});	
  })
})

app.post('/api/product', (req, res)=>{
console.log(req.body)
let product = new Product()
product.name = req.body.name;
product.price = req.body.price;
product.description = req.body.description;
product.images = req.body.images;
product.stock = req.body.stock;
product.discounts = req.body.discounts;
product.stars = req.body.stars;
product.comments = req.body.comments;
product.author = req.body.author;





product.save((err, productStored)=>{
	if(err) res.status(500).send({message: `Error al salvar el producto en la BD: ${err}`})
		res.status(200).send({product: productStored})
})

app.put('/api/product/:productId', (req, res)=>{
	let productId = req.params.productId
	let update = req.body
	Product.findByIdAndUpdate(productId, update, (err, productUpdated)=>{
     if(err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})
     	res.status(200).send({product: productUpdated})
	})

})


app.delete('/api/product/:productId', (req, res)=>{
let productId = req.params.productId
Product.findById(productId, (err, product)=>{
       if(err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
       	
       	product.remove(err=>{
         if(err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
       	 res.status(200).send({message: 'El producto ha sido eliminado'})
       	})
	})

})



})

/*app.listen(port, ()=>{
	console.log(`API REST corriendo en localhost:${port}`)
})*/

mongoose.connect('mongodb://localhost:27017/flat',(err, res)=>{
	if(err){
		return console.log(`Error al conectar con la BD: ${err}`)
	}
	console.log('la conexion con la BD fue exitosa')
	app.listen(port, ()=>{
	console.log(`API REST corriendo en localhost:${port}`)
})

})