const mongoose=require('mongoose');

const OrderSchema=new mongoose.Schema({
  id: String,
  dishid: Number,
  dishname: String,
  numperson: Number,
  total: Number,
  time: String,
},{collection:"order"});

const Order=mongoose.model('Order', OrderSchema);
module.exports=Order;