const express=require('express');
const path=require('path');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB=require('./config/db');
const dishRoutes=require('./routes/dishroutes');
const orderRoutes=require('./routes/orderroutes');

dotenv.config();
connectDB();

const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/dishes',dishRoutes);
app.use('/api/orders',orderRoutes);

const PORT=process.env.PORT || 5000;

const buildPath=path.join(__dirname,'../homecook/build');
app.use(express.static(buildPath));

app.get('/',(req, res)=>{
  res.sendFile(path.join(buildPath,'index.html'));
});

app.listen(PORT,()=>{
  console.log(`Server running at http://localhost:${PORT}`);
});
