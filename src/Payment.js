import React, {useContext, useState, useEffect} from 'react'
import CartContext from './context/CartContext'
import { baseService } from './network/services/baseService'
import { CheckCircleOutlined} from '@ant-design/icons';
import {Steps} from 'antd';
import NoPayment from './NoPayment';

function Payment({paid, setPaid}) {

  const {cart, setCart}=useContext(CartContext) 
  const { Step } = Steps;

  useEffect(() => {  
    localStorage.setItem('paid', (paid))
  },[paid])

  const handlePayment = async () => {  
    await postOrders()
    setCart([])   
  }

  const postOrders = async () => {
    try{ 
       cart.forEach((q) => {
            var data = {
                "id": Math.random(),
                "customerId": "Zeynep Copur",
                "employeeId": 0,
                "orderDate": Date.now(),
                "requiredDate": "0",
                "shippedDate": "0",
                "shipVia": 0,
                "freight": 0,
                "shipName": "Ship",
                "shipAddress": {
                  "street": "street",
                  "city": "city",
                  "region": "region",
                  "postalCode": 0,
                  "country": "TR"
                },
                "details": [
                  {
                    "productId": q.id,
                    "unitPrice": q.unitPrice,
                    "quantity": q.quantity,
                    "discount": 0
                  }
                ]
              }
            
            baseService.post("/orders", data)
        })
        setPaid(true)
    }
    catch{
         console.log("error post orders");
    }
 }
  return (
    <div>
    <Steps>
      <Step status={!paid && cart.length ==0 ? "wait" : "finish"}  title="Products"/>
      <Step status={!paid && cart.length ==0 ? "wait" : "finish"}  title="Order"  />
      <Step status={!paid && cart.length ==0 ? "wait" : !paid ? "process" : "finish" } title="Payment"/>
      <Step status={!paid && cart.length ==0 ? "wait" : paid ? "process" : "finish" }title="Done"  />
    </Steps>
        {!paid && cart.length !=0 ? 
            <button style={{
                  marginLeft:"25%",
                  marginTop:"5%",
                  width:"50%",
                  height:"150px",
                  fontSize:"50px",
                  backgroundColor:"green",
                  color:"white",
                  cursor:"pointer",
                  borderStyle:"groove"}} onClick={handlePayment} >Pay</button>     
        :
        !paid && cart.length ==0 ? <NoPayment/> :
          <div style={{
                marginLeft:"25%",
                marginTop:"5%",
                width:"50%",
                height:"150px",
                fontSize:"150px",
                    
              }}>
                <CheckCircleOutlined style={{
                marginLeft:"25%",
                marginTop:"5%",
                width:"50%",
                height:"100px",
                fontSize:"150px",
                color:"grey"    
              }} />
                <h2 style={{
                marginLeft:"15%",
                fontSize:"50px",
                color:"grey"    
              }}>Order Recieved</h2>
           </div>
        }
       
    </div>
  )
}

export default Payment