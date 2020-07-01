import React from 'react'

// antd styles
import { Layout, Row, Col  } from 'antd';

// components
import WelcomeHeader from './welcomeheader'
import SideLeftPage from './sideleftpage'
import MainPage from './mainpage'
import SideRightPage from './siderightpage'

export default function Index(props) {
    return (
        <React.Fragment>


            <Layout className="layout">

                <WelcomeHeader/>

                {/* body page */}
                <Row gutter={16}>




                    {/* left side  */}
                    <Col xs={24} md={6} lg={6} className="gutter-row" span={6}>

                        <SideLeftPage/> 

                    </Col>





                    {/* main column */}
                    <Col xs={24} md={12} lg={12}>

                        <MainPage/>

                    </Col>





                    {/* right side */}
                    <Col xs={24} md={6}  lg={6}>

                        <SideRightPage/>

                    </Col>

                </Row>

            </Layout>

            
        </React.Fragment>
    )
}
