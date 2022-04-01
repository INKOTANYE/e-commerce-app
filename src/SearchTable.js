import React, { useEffect, useState} from 'react'
import DefaultTable from './DefaultTable';
import { useParams} from "react-router-dom";
import { baseService } from './network/services/baseService'

function SearchTable({setPageLocation}) {
    const { name } = useParams()
    const [loading, setLoading]=useState(true)
    const [products, setProducts]=useState([])

    useEffect(()=>{
        getSearchList()     
       }, [name])
     
       const getSearchList = async () => {
        try{ 
            
            setLoading(true)
            const tableArr=[]
            const data = await baseService.get('/products')       
            const filteredArr=data.filter(q=>q.name.toLowerCase().includes(name.toLowerCase()))
            filteredArr.forEach((product) => {
                const {id, name, unitPrice, image}=product
                tableArr.push({ id, name, unitPrice, image:<img style={{width:140, height:100}} src="https://www.rollingstone.com/wp-content/uploads/2021/02/cacaoespresso-1.jpg" />})
              }
            )
            setProducts(tableArr) 
            setLoading(false)   
        }
        catch{
             console.log("error get products");
        }      
       }
     
  return (
    <div>
      {products.length > 1 ?
      <span> {products.length} items</span>
    :
    <span> {products.length} item</span>
     }
      
        <DefaultTable products={products} setPageLocation={setPageLocation} loading={loading}/>
    </div>
  )
}

export default SearchTable