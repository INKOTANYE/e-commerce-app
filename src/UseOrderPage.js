import React, {useEffect, useState, useContext} from 'react'
import { Table, Button, Spin } from 'antd';
import { baseService } from './network/services/baseService'
import CartContext from "./context/CartContext"

function UseOrderPage({paid}) {

  const [loading, setLoading]=useState(true)
  const [orders, setOrders]=useState([])
  const [refresh, setRefresh]=useState(false)
  const {cart, setCart}=useContext(CartContext)

  useEffect(() => {
    getOrders()
  },[refresh,paid])

  const removeOrder = async (id) => {
    await baseService.delete("/orders/"+id)
    setRefresh(!refresh)
  }

  const getOrders = async () => {
    try{ 
        setLoading(true)
        const tableArr=[]
        const data = await baseService.get('/orders')       
        const filteredArr=data.filter(q=>q.customerId === "Zeynep Copur")
        const products = await baseService.get('/products')       
        
        filteredArr.forEach((product) => {
            const findProduct=products.find(q=>q.id == product.details[0].productId)
            tableArr.push({ id:findProduct.id, orderDate:Date(product.orderDate).toLocaleString(), name:findProduct.name, quantity:product.details[0].quantity, unitPrice:product.details[0].unitPrice, image:<img style={{width:90, height:60}} src="https://www.rollingstone.com/wp-content/uploads/2021/02/cacaoespresso-1.jpg" />})
          }
        )
        setOrders(tableArr) 
        setLoading(false)       
    }
    catch{
         console.log("error get orders");
    }
   }
     
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['ascend', 'descend', 'ascend']
   }, 

   {
    title: 'Order Date',
    dataIndex: 'orderDate',
    key: 'orderDateid',

    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.orderDate - b.orderDate,
    sortDirections: ['ascend', 'descend', 'ascend']
   }, 
   
   {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',

    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.quantity - b.quantity,
    sortDirections: ['ascend', 'descend', 'ascend']
   }, 

   {
    title: 'Image',
    dataIndex: 'image',
    key: "image",

   }, 

   {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
        
         
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
   },

   {
    title: 'Price ($)',
    dataIndex: 'unitPrice',
    key: 'unitPrice',

        
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.unitPrice - b.unitPrice,
    sortDirections: ['ascend', 'descend', 'ascend']
  },
    
  {
    title: 'Detail',
    dataIndex: 'id',
    key: 'id',
    render: (id) => (<Button type="primary" style={{backgroundColor:"red", borderColor:"#7DC855"}} onClick={()=>removeOrder(id)}>Cancel Order</Button>)
  },
];

  return (
    <div>
          <Spin  tip="Loading..." spinning={loading}>
              <Table 
                  dataSource={orders} 
                  columns={columns} 
                  pagination={{ defaultPageSize: 10, defaultCurrent: 1 }}
                  scroll={{ y: 500 }} />
          </Spin>
    </div>
  )
}

export default UseOrderPage