import React,{useState, useEffect} from "react";
import './orderdetail.css';
import axios from 'axios';

function OrderDetail(){
  const[selectItem,setSelectItem]=useState([]);
  const[personCount,setPersonCount]=useState({});
  const[deliveryTime,setDeliveryTime]=useState("");
  const[isSubmitting,setIsSubmitting]=useState(false);
  const[error, setError]=useState(null);

  useEffect(()=>{
    try
    {
      const savedItems=JSON.parse(localStorage.getItem('selectItem')) || [];
      setSelectItem(savedItems);
      
      const initialCounts={};
      savedItems.forEach(item=>{
        initialCounts[item.id]=1;
      });
      setPersonCount(initialCounts);
    }catch(err){
      console.error("Failed to load saved items:", err);
      setError("Failed to load your saved order. Please refresh the page.");
    }
  },[]);

  const handlePersonChange=(dishId, count)=>{
    setPersonCount(prev=>({
      ...prev,
      [dishId]: Math.max(1,parseInt(count)||1)
    }));
  };

  const removeItem=(dishId)=>{
    try{
      const updatedItems=selectItem.filter(item => item.id!==dishId);
      setSelectItem(updatedItems);
      localStorage.setItem('selectItem',JSON.stringify(updatedItems));
      
      setPersonCount(prev =>{
        const newCounts={ ...prev };
        delete newCounts[dishId];
        return newCounts;
      });
    }catch(err)
    {
      console.error("Failed to remove item:", err);
      setError("Failed to remove item. Please try again.");
    }
  };

  const validateDeliveryTime=()=>{
    if (!deliveryTime)
    {
      setError("Please select a delivery time");
      return false;
    }
    
    const selectedTime=new Date(deliveryTime);
    const currentTime=new Date();
    const hoursDifference=(selectedTime-currentTime)/(1000 * 60 * 60);
    
    if(hoursDifference<5){
      setError("Delivery time must be at least 5 hours from now");
      return false;
    }
    setError(null);
    return true;
  };

  const handleCheckout=async()=>{
    if (!validateDeliveryTime()) return;
    if (selectItem.length===0){
      setError("Your order is empty");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const orders=selectItem.map(item =>({
        dishid: Number(item.id),
        numperson: Number(personCount[item.id]||1),
        time: new Date(deliveryTime).toISOString()
      }));

      console.debug("Submitting orders:", orders);

      const results=await Promise.allSettled(
        orders.map(order=>axios.post('/api/orders', order))
      );

      const failedOrders=results.filter(r => r.status==='rejected');
      if (failedOrders.length>0){
        const errorMessages=failedOrders.map(r => 
          r.reason.response?.data?.message||r.reason.message
        );
        throw new Error(
          `Failed to submit ${failedOrders.length} orders: ${errorMessages.join(", ")}`
        );
      }

      const orderDetail={
        order: selectItem.map(item=>({
          name: item.name,
          persons: personCount[item.id]||1,
          serves: item.serves||item.serves||1, 
          price: item.price
        })),
        time: new Date(deliveryTime).toLocaleString()
      };
      
      localStorage.setItem('orderDetail',JSON.stringify(orderDetail));

      localStorage.removeItem('selectItem');
      setSelectItem([]);
      setPersonCount({});
      setDeliveryTime("");
      
      alert("Order placed successfully! You can now proceed to checkout.");
    } catch (err) {
      console.error("Checkout failed:", err);
      setError(
        err.message||"Failed to place order. Please check your connection."
      );
    } finally{
      setIsSubmitting(false);
    }
  };
  
    return(
        <div className="order">
            <h2>
                Order Detail
            </h2>
            {selectItem.length===0 ?(
                <p>
                    No order yet. Please select your order from Home page.
                </p>
            ):(
                <div className="list">
                    {
                        selectItem.map(dish=>(
                            <div key={dish.id} className="card">
                                <h3>
                                    {dish.name}
                                </h3>
                                <p>
                                    Serves: {dish.serves} person
                                </p>
                                <p>
                                    Price: Rs. {dish.price}
                                </p>
                                <label>
                                    Enter Number of Persons:
                                    <input type="number" min="1" value={personCount[dish.id]||1} onChange={(typing)=>handlePersonChange(dish.id,typing.target.value)}>
                                    </input>
                                </label>
                                <button onClick={()=>removeItem(dish.id)} className="removebtn">
                                    Remove   
                                </button>
                            </div>
                        ))
                    }

                    <div className="time">
                        <label>
                            Select Delivery Time:
                            <input type="datetime-local" value={deliveryTime} onChange={(typing)=>setDeliveryTime(typing.target.value)} required>
                            </input>
                        </label>
                        {deliveryTime&&(
                            <p className="selecttime">
                                Selected Time:
                                <strong>
                                    {new Date(deliveryTime).toLocaleString()}
                                </strong>
                            </p>
                        )}
                    </div>

                    <button onClick={handleCheckout}>
                        Proceed to Checkout 
                    </button>
                </div>
            )}
        </div>
    );
}

export default OrderDetail;