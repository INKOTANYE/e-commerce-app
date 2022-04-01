import React, { useEffect, useState} from 'react'
import { baseService } from './network/services/baseService'
import DefaultTable from './DefaultTable'

function HomeTable({setPageLocation}) {

   const [products, setProducts]=useState([])
   const [loading, setLoading]=useState(true)

   useEffect(()=>{
       getProducts()
   },[])

   const getProducts = async () => {
    try{ 
        setLoading(true)
        const tableArr=[]
        const data = await baseService.get('/products')       
        data.forEach((product,i) => {
          if(i<10) {
            const {id, name, unitPrice, image}=product
            tableArr.push({ id, name, unitPrice, image:<img style={{width:140, height:100}} src="https://www.rollingstone.com/wp-content/uploads/2021/02/cacaoespresso-1.jpg" />})
          }
        })
        setProducts(tableArr) 
        setLoading(false)       
    }
    catch{
         console.log("error get products");
    }
 }

  return (
    <div >
      <DefaultTable products={products} setPageLocation={setPageLocation} loading={loading}/>       
    </div>
  )
}

export default HomeTable