import React from "react";
import Head from "./head";
import Home from './home';
import Checkout from './checkout';
import OrderDetail from './orderdetail';
import './App.css';

function App() {
  const current=window.location.pathname;

  let currentpage;
  if(current==='/checkout')
  {
    currentpage=Checkout;
  }
  else if(current==='/detail')
  {
    currentpage=OrderDetail;
  }
  else
  {
    currentpage=Home;
  }

  const PageDisplay=currentpage;

  return(
    <div className="app">
      <Head />
      <PageDisplay />
    </div>
  );
}

export default App;