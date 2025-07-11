const mongoose = require('mongoose');

const DishSchema=new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  price: Number,
  serves: Number,
}, {collection:"dish"});

const Dish=mongoose.model('Dish', DishSchema);
module.exports=Dish;