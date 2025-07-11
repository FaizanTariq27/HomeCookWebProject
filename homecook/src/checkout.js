import React,{useState,useEffect} from "react";
import './checkout.css';

function Checkout(){
    const [orderInfo,setOrder]=useState({order:[],time:""});
    const [address,setAddress]=useState("");
    const [price,setPrice]=useState(0);

    useEffect(()=>{
        const data=JSON.parse(localStorage.getItem("orderDetail"))||{order:[],time:""};
        setOrder(data);
        let total=0;
        data.order.forEach(dish=>{
            const serving=Math.ceil(dish.persons/dish.serves);
            total+=dish.price*serving;
        });
        setPrice(total);
    },[]);

    const orderconfirm=()=>{
        if(!address.trim())
        {
            alert("Please enter your address.");
            return;
        }

        alert("Order Confirmed. You will received your order.")
        localStorage.removeItem("orderDetail");
        setOrder({order:[],time:""});
        setAddress("");
        setPrice(0);
    }

    return(
        <div className="checkout">
            <h2>
                Checkout
            </h2>
            {
                orderInfo.order.length===0?(
                    <p>
                        No Order yet. Kindly place your order.
                    </p>
                ):
                (
                    <div className="info">
                        {
                            orderInfo.order.map((dish,index)=>{
                                const servesNeed=Math.ceil(dish.persons/dish.serves);
                                const price=dish.price*servesNeed;
                                return(
                                    <div key={index} className="card">
                                        <h3>
                                            {dish.name}
                                        </h3>
                                        <p>
                                            Number of Persons: {dish.persons}
                                        </p>
                                        <p>
                                            Serves per Dish: {dish.serves}
                                        </p>
                                        <p>
                                            Price per serving: Rs. {dish.price}
                                        </p>
                                        <p>
                                            Serving Need: {servesNeed}
                                        </p>
                                        <p>
                                            Total Price: Rs. {price}
                                        </p>
                                    </div>
                                );
                            })
                        }

                        <div className="detail">
                            <h3>
                                Delivery Time:
                            </h3>
                            <p>
                                {orderInfo.time}
                            </p>
                            <h3>
                                Delivery Address
                            </h3>
                            <textarea rows="4" placeholder="Enter your address here!" value={address} onChange={(typing)=>setAddress(typing.target.value)} required>
                            </textarea>
                            <h2>
                                Total Amount: Rs. {price}
                            </h2>

                            <button className="btn" onClick={orderconfirm}>
                                Order Confirm
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
export default Checkout;