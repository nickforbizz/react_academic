import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {   Affix, Menu  } from 'antd';


// dependencies
import { AreaChartOutlined,
    FundProjectionScreenOutlined, DollarCircleOutlined, 
     SnippetsOutlined, FormOutlined
} 
from '@ant-design/icons';
import appAuth from '../../appauth'

export default function SideLeftPage(props) {

    console.log();
    

    const [top] = useState(100);

    const handleClick = e => {
        console.log('click ', e);
    };

    const renderPlaceOrder = () => {
        let template = null
        if(!appAuth.isAuthenticated){
            template = <Menu.Item> 
                            <FormOutlined /> <Link to="/acc_placeorder"> Place an Order </Link> 
                        </Menu.Item>

        }
        return template
    }

    return (
        <React.Fragment>
            
            
            <div className='hide-on-med-and-down' style={{ height: '100vh'}}>

                <Affix offsetTop={top}>

                    <Menu
                    onClick={handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    className="sidemenu"
                    >

                        <Menu.Item>
                            <AreaChartOutlined /> <Link to="/acc_bio"> Academic Bio </Link> 
                        </Menu.Item>

                        {
                            renderPlaceOrder()
                        }

                        
                        <Menu.Item> 
                            <DollarCircleOutlined /> <Link to="/acc_payrates"> Pay Rates </Link>  
                        </Menu.Item>

                        <Menu.Item> 
                            <FundProjectionScreenOutlined /> <Link to="/acc_services"> Services </Link>  
                        </Menu.Item>

                        <Menu.Item> 
                            <SnippetsOutlined />  <Link to="/acc_worksamples"> Work Samples </Link>  
                        </Menu.Item>

                    </Menu>  

                </Affix>              

            </div>

        </React.Fragment>
    )
}
