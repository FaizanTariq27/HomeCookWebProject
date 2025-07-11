const express=require('express');
const router=express.Router();
const Order=require('../models/Order');
const Dish=require('../models/Dish');

router.post('/', async (req,res)=>{
  try {
    const{id,dishid,numperson,time}=req.body;

    const dish=await Dish.findOne({id: dishid});
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    const total=dish.price*numperson;

    const order=new Order({
      id,
      dishid,
      dishname: dish.name,
      numperson,
      total,
      time
    });

    await order.save();
    res.status(201).json(order);
  }catch(err){
    res.status(400).json({ message: err.message });
  }
});

router.get('/',async(req,res)=>{
 try{
   const orders=await Order.find();
   res.json(orders);
 }catch (err){
   res.status(500).json({message: err.message});
 }
});

module.exports = router;