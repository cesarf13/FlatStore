'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductSchema = Schema({
	name: String,
	price:{
		type: Number,
		default: 0
	},
	description: String,

	images: {
		type: String,
		enum:[]
	},

	stock: Number,

	discounts: {
		type: Number,
		enum:[10, 15, 25, 35]
	},

	stars: { 
      type: String,
	  enum:[1, 2, 3, 4, 5]
	},

    comments: String,
    author: String

	 
})


 
    
	


module.exports = mongoose.model('Product', ProductSchema)
