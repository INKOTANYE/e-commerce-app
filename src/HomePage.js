import React, { useState, useEffect, useContext, useRef} from 'react'
import CartContext from './context/CartContext'
import ProductDetail from './ProductDetail'
import ProductList from './ProductList'
import HomeTable from './HomeTable'
import SearchTable from './SearchTable'
import Cart from './Cart'
import Payment from './Payment'
import { baseService } from './network/services/baseService'
import { Routes, Route, useNavigate} from 'react-router-dom'
import "./HomePage.css"
import { Layout, Menu, Breadcrumb, Input, Space,Row, Col, Dropdown, Badge} from 'antd';
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  DownOutlined, 
  HomeOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import UseOrderPage from './UseOrderPage'


function HomePage() {
  

  const {cart}=useContext(CartContext)
  const navigate = useNavigate();
  const { Header, Content, Sider, Footer } = Layout;
  const { Search } = Input;
  const { SubMenu } = Menu;

  const [input, setInput]=useState()
  const select= useRef("Home");
  const [collapsed, setCollapsed]=useState(false)
  const [categories, setCategories]=useState([])
  const [refresh, setRefresh]=useState(false)
  const [paid, setPaid]=useState(false)
  const [pageLocation, setPageLocation]=useState({
    category:"",
    product:""
  })

  const menu = (
    <Menu>
      <Menu.Item>
          My Orders     
      </Menu.Item>
    </Menu>
  );
  
  const getCategories = async () => {
    try{ 
         const data= await baseService.get("/categories")
         setCategories(data)
    }
    catch{
         console.log("error get categories");
    }
 }

 useEffect(()=>{
   getCategories()
  },[])

 const goToCategory = (category) => {

   navigate(`/category-${category.id}`)
   setPageLocation({ 
     category:category.name,
     product:"" 
    })
   setRefresh(!refresh)
   select.current=category.name
}

const goToHome = () => {
  navigate(`/`)
  setPageLocation({
    category:"",
    product:""
  })
  select.current="Home"
}

const goToCart = () => {
  navigate(`/cart`)
  setPageLocation({
    category:"Cart",
    product:""
  })
  select.current="Cart"
}

const goToOrders = () => {
  navigate(`/orders`)
  setPageLocation({
    category:"Orders",
    product:""
  })
  select.current="Orders"
}

const goToSearch = (e) => {
  e.preventDefault()
  if (!input || /^\s*$/.test(input)) {
    return;
  }
  navigate(`/search/${input}`)
  setPageLocation({
    category:"Search",
    product:input
  })
  
  setInput()
  select.current="Home"
}

const handleChange = (e) => {
  setInput(e.target.value)
}


return (
  <div>    
  <Layout>
      <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo"/>
          <Row>
            <Col span={8}>
              <h1 onClick={goToHome} style={{color:"white", fontSize:40, marginLeft:"9%", cursor:"pointer"}}> <ShoppingOutlined/>  Shopping Land</h1>
            </Col>
            <Col span={8}>
               <Space  direction="vertical" style={{ marginTop:"2vh", marginLeft:"15%"}}>
                 <Search placeholder="Search Product" onChange={handleChange} value={input} onPressEnter={goToSearch}  size="large" style={{ width: '200%' }} />  
               </Space>
            </Col>
            <Col span={8}>
              <div onClick={goToCart} style={{color:"white", float:"right", cursor:"pointer" }}>
                 <Badge style={{fontSize:20, marginTop:"2vh"}}  count={cart.length}>
                   <ShoppingCartOutlined  style={{color:"white", marginTop:"2vh", fontSize:40}}/>
                 </Badge>
              </div>
              <div  onClick={goToOrders} style={{color:"white", marginTop:"1vh", marginRight:"3vh", float:"right", cursor:"pointer" }}>
                 <Dropdown overlay={menu} placement="bottomLeft" arrow>
                   <div className="ant-dropdown-link" >
                    <UserOutlined style={{fontSize:32, color:"white", }}/> <DownOutlined style={{color:"white"}}/>
                   </div>
                 </Dropdown>                
              </div>
            </Col>
          </Row>
      </Header>

    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={()=>setCollapsed(!collapsed)} 
      style={{ marginTop: 64, width:"200", height:"100vh%" }} className="site-layout-background">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[select.current]}
          selectedKeys={[select.current]}
          style={{ height: '100%', borderRight: 0 }}
        > 
        <Menu.Item key="Home" onClick={goToHome} icon={<HomeOutlined />}>Home</Menu.Item>
        <SubMenu key="Account" icon={<UserOutlined/> } title="My Account">
             <Menu.Item key="Orders" onClick={goToOrders}>My Orders</Menu.Item> 
             <Menu.Item key="Cart" onClick={goToCart}>My Cart ({cart.length})</Menu.Item>
          </SubMenu>
        <SubMenu key="Categories" icon={<UnorderedListOutlined />} title="Categories">
          {categories.map((category,key)=>(   
              <Menu.Item id={key} onClick={()=>{goToCategory(category)}} key={category.name}>{category.name}</Menu.Item>
           ))}    
          </SubMenu>
 
        </Menu>
      </Sider>

      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64,}}>
        <Breadcrumb style={{ margin: '16px 0'}}>
          <Breadcrumb.Item onClick={goToHome} style={{ cursor:"pointer" }}>Home</Breadcrumb.Item>
          <Breadcrumb.Item >{pageLocation.category}</Breadcrumb.Item>
          <Breadcrumb.Item >{pageLocation.product}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
           <Routes>
                <Route path="/" element={<HomeTable setPageLocation={setPageLocation} />} />
                <Route path="/category-:categoryId" element={<ProductList refresh={refresh} setPageLocation={setPageLocation}/>} />
                <Route path="/product-:id" element={<ProductDetail setPageLocation={setPageLocation}  />} />
                <Route path={"/search/:name" }  element={<SearchTable setPageLocation={setPageLocation} />} />
                <Route path={"/cart" }  element={<Cart setPageLocation={setPageLocation} select={select} setPaid={setPaid}/>} />
                <Route path={"/cart/payment" }  element={<Payment paid={paid} setPaid={setPaid}/>} />
                <Route path={"/orders" }  element={<UseOrderPage  paid={paid} />} />
            </Routes>
        </div>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  </Layout>
  </div>
  )
}

export default HomePage