import {useContext, useState, useEffect} from 'react'
import CartContext from "./context/CartContext"
import { useParams} from "react-router-dom";
import { baseService } from "./network/services/baseService"
import "./ProductDetail.css"
import { Spin } from 'antd';

function ProductDetail() {

  const [product, setProduct]=useState({})
  const [loading, setLoading]=useState(true)
  const { id } = useParams()
  const {cart, setCart}=useContext(CartContext)
  

  useEffect(() => {
    getData();
  }, [])

const getData = async () => {
  try {
    setLoading(true)
    const data = await baseService.get("/products")
    const filteredArr=data.filter(q=>q.id == id)
    setProduct(filteredArr[0]); 
    setLoading(false)
  }
  catch {
    console.log("error");
  }    
}

const addToCart = (product) => {
  let cartProduct = cart.find(q=>q.id===product.id)

  if(cartProduct){
      cartProduct.quantity += 1
      cartProduct.price += product.unitPrice
      setCart([...cart])      
  }
  else{
      const cartProduct = {
          id: product.id,
          name: product.name,
          unitPrice : product.unitPrice,
          price: product.unitPrice,
          quantity: 1
      }
      setCart([...cart,cartProduct])    
  }
}

return (
<Spin tip="Loading..." spinning={loading}>
<main className="container">
 
 <div class="left-column">
    <img  src="https://www.rollingstone.com/wp-content/uploads/2021/02/cacaoespresso-1.jpg"  alt=""/>
 </div>

<div className="right-column">

   <div className="product-description">
     <span>{product.quantityPerUnit}</span>
     <h2>{product.name}</h2>
     <p>{product.unitsInStock} product(s) left</p>
   </div>

   <div className="product-price">
     <span>{product.unitPrice}$</span>
     {product.unitsInStock == 0 ? <div className="no-stock">No Stock</div>
     :
     <button onClick={()=>addToCart(product)} className="cart-btn">Add to cart</button>}
   </div>
 </div>
</main>
</Spin>
  )
}

export default ProductDetail