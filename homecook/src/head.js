import React from "react";
import './head.css';

function Head() {
    return(
        <div className="head">
            <img className="logo" src="/logo.png" alt="Home Food"></img>
            <h2 className="kitchen">
                Home Kitchen
            </h2>
           <nav>
            <a href="/">
                Home                
            </a>
            <a href="/detail">
                Order Detail                
            </a>
            <a href="/checkout">
                Checkout               
            </a>
            </nav> 
        </div>
    );
}

export default Head;