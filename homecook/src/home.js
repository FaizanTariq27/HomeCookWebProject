import React,{useState,useEffect } from "react";
import './home.css';
import axios from 'axios';

function Home(){
  const [menu,setMenu]=useState([]);

  const daymenu={
    Monday:[{id: 1},{id: 2},{id: 3}],
    Tuesday:[{id: 4},{id: 5},{id: 6}],
    Wednesday:[{id: 7},{id: 8},{id: 9}],
    Thursday:[{id: 10},{id: 11},{id: 12}],
    Friday:[{id: 13},{id: 14},{id: 15}],
    Saturday:[{id: 16},{id: 17},{id: 18}],
    Sunday:[{id: 19},{id: 20},{id: 21}]
  };

  useEffect(()=>{
    async function loadMenu()
    {
      try{
        const res=await axios.get('/api/dishes');
        const allDishes=res.data;
        const day=new Date().toLocaleDateString('en-US', {weekday: 'long'});
        
        const todayMenu=allDishes.filter(dish => 
          daymenu[day].some(menuItem => menuItem.id===dish.id)
        );
        
        setMenu(todayMenu);
      }catch(error) 
      {
        console.error("Error loading menu:", error);
      }
    }
    loadMenu();
  },[]);

  const addToOrder=(dish)=>{
    const currentOrders=JSON.parse(localStorage.getItem('selectItem'))||[];
    const isAlreadyAdded=currentOrders.some(item => item.id===dish.id);
    
    if (isAlreadyAdded){
      alert(`${dish.name} is already in your order`);
      return;
    }
    
    const updatedOrders=[...currentOrders, dish];
    localStorage.setItem('selectItem', JSON.stringify(updatedOrders));
    alert(`${dish.name} added to your order`);
  };

  return(
    <div className="home">
      <h2>Today's Menu</h2>
      <div className="menulist">
        {menu.map(item=>(
          <div key={item.id} className="foodcard">
            <img src={item.image} className="foodimage" alt={item.name} />
            <h3>
              {item.name}
            </h3>
            <p>
              Price: Rs. {item.price}
            </p>
            <p>
              Serves: {item.serves} person{item.serves > 1 ? 's' : ''}
            </p>
            <button className="orderbtn" onClick={() => addToOrder(item)}>Order</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;