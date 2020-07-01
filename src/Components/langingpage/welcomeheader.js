import React from 'react'

import {  Row, Col } from 'antd';

// components
import Maincarousel from '../../Widgets/Carousel/Main/maincarousel';

// styles
import styles from './welcomeheader.module.css'

export default function WelcomeHeader() {
    return (
        <React.Fragment>

            {/* welcome header */}
            <div className={styles.welcome_header}>


                <Row style={{margin: '2.3rem'}}>

                    <Col xs={24} sm={14} md={16}>

                        <div className={styles.header_text}>
                            <h4>Competent Blogger and writer</h4> <hr />
                            <p>React Mobile navbar is a horizontal navigation component which apart from traditional, text links, might embed also icons.
                            Basic exampl</p>

                        </div> 

                    </Col>

                    <Col xs={24} sm={8} md={8}>
                        <Maincarousel height={15}/>
                    </Col>

                    
                </Row>
            </div>
            
        </React.Fragment>
    )
}
