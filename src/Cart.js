import {useContext, useState, useEffect} from 'react'
import CartContext from "./context/CartContext"
import "./Cart.css"
import { useNavigate} from 'react-router-dom'
import {Steps} from 'antd';

function Cart({setPageLocation, select, setPaid}) {
    const { Step } = Steps;
    const {cart, setCart}=useContext(CartContext)
    const [total, setTotal]=useState(0)
    const navigate = useNavigate();


    useEffect(()=>{
        setPaid(false)
        let totalPrice=cart.map((q)=>q.price)
        var sum=0     
        for (let i = 0; i < totalPrice.length; i++) {
            sum += totalPrice[i]        
        }
        setTotal(sum)
    },[cart,cart.price])

    const decProduct=(product)=>{
        product.quantity >1 ?  product.quantity -= 1 : product.quantity = 1
        product.price = product.unitPrice*product.quantity
        setCart([...cart])
    }

    const incProduct=(product)=>{
        product.quantity += 1
        product.price = product.unitPrice*product.quantity
        setCart([...cart])
    }

    const removeItem=(item)=>{
        setCart(cart.filter(q=>q.id != item.id))
    }

    const goToPayment = () => {
      navigate(`/cart/payment`)
      setPageLocation({
        category:"Cart",
        product:"Payment"
      })
     select.current="Account"
    }

  return (
    <div>
     <Steps>
      <Step status={cart.length == 0 ? "wait":"finish"} title="Products"/>
      <Step status={cart.length == 0 ? "wait":"process"} title="Order"  />
      <Step status="wait" title="Payment"/>
      <Step status="wait" title="Done"  />
    </Steps>
      <div className='body'>
        {cart.length != 0 ?
        <div className='Cart-Container'>
          <div className="Header">
            <h3 className="Heading">Products</h3>
           <h5 className="Action" onClick={()=>setCart([])}>Remove all</h5>
          </div>
          {cart.map((item) => (
             <div className="Cart-Items" >
                <div className="image-box">
                    <img src="http://www.sitech.co.id/assets/img/products/default.jpg" style={{ height:"120px" }} />
                </div>
                <div className="about">
                    <h1 className="title">{item.name}</h1>
                    <h3 className="subtitle">{item.unitPrice.toFixed(2)}$</h3>     
                </div>
                <div className="counter">
                    <button onClick={()=>decProduct(item)} className="btn">-</button>
                    <div className="count"> {item.quantity}</div>
                    <button onClick={()=>incProduct(item)} className="btn">+</button>
                </div>
                <div className="prices">
                    <div className="amount">{item.price.toFixed(2)}$</div>
                    
                    <div onClick={()=>removeItem(item)} className="remove"><u>Remove</u></div>
                </div>
             </div>
  ))}
          
          <hr/>
          <div className="items">{cart.length} item(s)</div>
          <div className="checkout">
            <div className="total">
              <div className="total-amount"><span className='total'>Total: </span>{total.toFixed(2)}$</div>
            </div>
            <button onClick={goToPayment} className="button">Order</button>
          </div>
        </div>
        :
        <h2> Empty Cart :(</h2>}
      </div>
    </div>
  )
}             
export default Cart