import React, { useState, useEffect } from 'react'

// antd styles
import { Layout, Row, Col  } from 'antd';


// dependencies
import M from 'materialize-css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


// import helpers
import { URL, fetchData } from '../../Helpers/config'
import appauth from '../../appauth';

// components
import WelcomeHeader from './welcomeheader'
import SideLeftPage from './sideleftpage'
import MainPage from './mainpage'
import SideRightPage from './siderightpage'

export default function Index(props) {

    // states
    const [blogs, setBlogs] = useState([])


    useEffect(()=>{

        M.AutoInit();

        let url_blog = `${URL}/api/blogs?_token=${appauth.apptoken}` 
        let data = {
            "_token": appauth.apptoken
        }


        fetchData(url_blog, {data}).then(data=>{
            console.log(data);
            
            if(data.code === -1){
                toast.error("Fatal Error while fetching data")
            }else{
                (data.msg.code === -1) ? toast.error("Fatal Error while fetching data") : setBlogs(data.msg.msg)
            }
            
        })

    },[])

    if(blogs.length < 1 ){

        return (<div className="card material-table">
            <ToastContainer />
            <h3>Hey Wellcome</h3>
            <p className=''> Loading Data ... </p>
        </div>)

    }else{

        return (
            <React.Fragment>
    
    
                <Layout className="layout">
    
                    <WelcomeHeader  data={blogs}/>
    
                    {/* body page */}
                    <Row gutter={16}>
    
    
    
    
                        {/* left side  */}
                        <Col xs={24} md={6} lg={6} className="gutter-row" span={6}>
    
                            <SideLeftPage/> 
    
                        </Col>
    
    
    
    
    
                        {/* main column */}
                        <Col xs={24} md={12} lg={12}>
    
                            <MainPage  data={blogs}/>
    
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
}
