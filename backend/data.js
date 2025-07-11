const mongoose=require('mongoose');
const Dish=require('./models/Dish');
require('dotenv').config({ path: './.env' });

const dishes=[
  { id:1, name:'Chicken Biryani', image:'/biryani.png', price:300, serves:1 },
  { id:2, name:'Daal Chawal', image:'/chawal.png', price:200, serves:1 },
  { id:3, name:'Aloo Qeema', image:'/qeema.png', price:300, serves:2 },
  { id:4, name:'Nihari', image:'/nihari.png', price:400, serves:1 },
  { id:5, name:'Aloo Gosht', image:'/aloo.png', price:200, serves:1 },
  { id:6, name:'Daal', image:'/daal.png', price:200, serves:2 },
  { id:7, name:'Daal', image:'/daal.png', price:200, serves:2 },
  { id:8, name:'Daal Chawal', image:'/chawal.png', price:200, serves:1 },
  { id:9, name:'Aloo Gosht', image:'/aloo.png', price:200, serves:1 },
  { id:10, name:'Chicken Biryani', image:'/biryani.png', price:300, serves:1 },
  { id:11, name:'Nihari', image:'/nihari.png', price:400, serves:2 },
  { id:12, name:'Aloo Qeema', image:'/aloo.png', price:300, serves:1 },
  { id:13, name:'Daal', image:'/daal.png', price:200, serves:1 },
  { id:14, name:'Aloo Gosht', image:'/aloo.png', price:300, serves:1 },
  { id:15, name:'Chicken Biryani', image:'/biryani.png', price:300, serves:1 },
  { id:16, name:'Chicken Biryani', image:'/biryani.png', price:300, serves:1 },
  { id:17, name:'Daal Chawal', image:'/chawal.png', price:200, serves:1 },
  { id:18, name:'Aloo Qeema', image:'/qeema.png', price:300, serves:2 },
  { id:19, name:'Chicken Biryani', image:'/biryani.png', price:300, serves:1 },
  { id:20, name:'Daal Chawal', image:'/chawal.png', price:400, serves:2 },
  { id:21, name:'Aloo Gosht', image:'/aloo.png', price:300, serves:1 },
];

async function run()
{
  try{
    await mongoose.connect(process.env.MONGO_URI);
    await Dish.deleteMany({});
    await Dish.insertMany(dishes);
    console.log('Dishes successfully added');
    mongoose.disconnect();
  }catch(err)
  {
    console.error('Error adding dishes:', err);
  }
}

run();