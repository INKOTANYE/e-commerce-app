import React from 'react'
import { Table, Button, Spin } from 'antd';
import { useNavigate} from "react-router-dom";

function DefaultTable({products, setPageLocation, loading}) {

    const navigate = useNavigate();
  
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
    
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
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
            render: (id) => (<Button type="primary" style={{backgroundColor:"#7DC855", borderColor:"#7DC855"}} onClick={() => { goToDetail(id) }}>Detail</Button>)
        },
    ];
    
    const goToDetail = (id) => {  
        navigate(`/product-${id}`)
        setPageLocation (prev => {
          return { ...prev, product:id}    
        })
      }
      
      return (
        <div >
          <Spin  tip="Loading..." spinning={loading}>
              <Table 
                  dataSource={products} 
                  columns={columns} 
                  pagination={{ defaultPageSize: 10, defaultCurrent: 1 }}
                  scroll={{ y: 500 }} />
          </Spin>         
        </div>
      )
    
}

export default DefaultTable