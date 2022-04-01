import React from 'react'
import {CartProvider} from "./context/CartContext"
import HomePage from './HomePage'

function Container() {
  return (
    <div>
        <CartProvider>
            <HomePage/>
        </CartProvider>    
    </div>
  )
}

export default Container