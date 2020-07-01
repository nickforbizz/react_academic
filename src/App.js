import React, { useState} from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import 'react-toastify/dist/ReactToastify.css';



import { Layout, Row, Col, Affix, Menu  } from 'antd';




import './App.css';



import Maincarousel from './Widgets/Carousel/Main/maincarousel';
import Header from './HOC/layout/header/appheader';


const {  Footer } = Layout;


function App() {
  const [top, setTop] = useState(100);

  const handleClick = e => {
    console.log('click ', e);
  };
  return (
    <div className="App">

      <Header/>

      <Layout className="layout">
        <div className='welcome_header'>
            <Row style={{margin: '2.3rem'}}>
              <Col xs={24} md={16}>
                <div className='header_text'>
                  <h4>Competent Blogger and writer</h4> <hr />
                  <p>React Mobile navbar is a horizontal navigation component which apart from traditional, text links, might embed also icons.
                     Basic exampl</p>

                </div>

              </Col>
              <Col xs={24} md={8}>
                  <Maincarousel height={15}/>
              </Col>
            </Row>
          </div>
        <Row gutter={16}>
          <Col xs={24} md={6} lg={6} className="gutter-row" span={6}>
            <div className='hide-on-small-only '>

            <Affix offsetTop={top}>

              <Menu
                onClick={handleClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                className="sidemenu"
              >

                <Menu.Item><AreaChartOutlined />Academic Bio</Menu.Item>
                <Menu.Item> <FormOutlined /> Place an Order</Menu.Item>
                <Menu.Item> <DollarCircleOutlined />  Pay Rates</Menu.Item>
                <Menu.Item> <FundProjectionScreenOutlined />Services</Menu.Item>
                <Menu.Item> <SnippetsOutlined /> Work Samples</Menu.Item>

                </Menu>  

              </Affix>              

            </div>
          </Col>

          <Col xs={24} md={12} lg={12}>
            <div className="hide-on-med-and-up">
              <h4>News</h4>
              <div className='divider'></div>
            </div>
            
            <Maincarousel height={25}/>

            <div className="col s12 m7">
              <h4 className="">News</h4>

              <div className="card horizontal">
                <div className="card-image">
                  <img src="/images/Donate page 2.PNG" alt=""/>
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <p>I am a very simple card. I am good at containing small bits of information.</p>
                  </div>
                  <div className="card-action right-align">
                      <a class="waves-effect waves-light btn-small">View</a>
                  </div>
                </div>
              </div>

              <div className="card horizontal">
                <div className="card-image">
                  <img src="/images/Donate page 2.PNG"  alt=""/>
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <p>I am a very simple card. I am good at containing small bits of information.</p>
                  </div>
                  <div className="card-action right-align">
                    <a class="waves-effect waves-light btn-small">View</a>
                  </div>
                </div>
              </div>

            </div>

          
          </Col>

          <Col xs={24} md={6}  lg={6}>
            <div className="pad_top" id="top_sticker_left">
            <Affix offsetTop={top}>
              <ul className="collapsible">
                <li className="active">
                  <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
                  <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
                <li className="active">
                  <div className="collapsible-header "><i className="material-icons">place</i>Second</div>
                  <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
                <li>
                  <div className="collapsible-header "><i className="material-icons">whatshot</i>Third</div>
                  <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
              </ul>
              </Affix>
            </div>
          </Col>
        </Row>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    
    </div>
  );
}

export default App;
