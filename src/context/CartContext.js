import {createContext, useState, useEffect} from 'react'

const CartContext=createContext(null)

export const CartProvider = ({children}) => {
    const [cart, setCart]=useState([])

      
  useEffect(() => {  
    localStorage.setItem('cartLength', (cart.length))
  },[cart])

    const values={cart, setCart}

    return <CartContext.Provider value={values}>{children}</CartContext.Provider>
}

export default CartContext