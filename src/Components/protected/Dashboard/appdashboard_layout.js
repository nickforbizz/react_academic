import React from 'react'


// dependencies
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  AudioOutlined,
  FormOutlined,
  BookOutlined,
  ToolOutlined
} from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// helpers
import { URL, fetchData } from '../../../Helpers/config'
import appauth from '../../../appauth';


// styles
// import styles from './dashboard.module.css'
import { Link } from 'react-router-dom';

const { Content,  Sider } = Layout;
const { SubMenu } = Menu;

class AppDashboardLayout extends React.Component {
  state = {
    collapsed: false,
    user:[],
    isUserAdmin: 'N'
  };

  componentDidMount() {
    let user_id = (appauth.user_id)
    let url_user = `${URL}/api/get_user/${user_id}`
    if(user_id !== null){
        fetchData(url_user).then(data=>{
            if(data.code === -1) {
              toast.error("Fatal Error while fetching data")               
            }else{
              this.setState({
                isUserAdmin: data.msg.msg.admin,
                user: data.msg.msg,
              })

            }
            
        })
    }else{
      toast.error("User Not Found")
    }
    
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    if (this.state.user.length < 1 && this.isUserAdmin === undefined){
      return (
        <div className="card material-table">
            <ToastContainer />
            <h5>Loading User ...</h5>
        </div>
      )
    }else{
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <ToastContainer />
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
  
  
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/dashboard"> Home</Link> 
              </Menu.Item>
  
              <SubMenu key="sub10" icon={<FormOutlined />} title="Academic">
  
                <Menu.Item key="120">
                  <Link to="/placeOrder"> Place Order</Link> 
                </Menu.Item>
  
                <Menu.Item key="121">
                  <Link to={{
                     pathname: '/nil_orders',
                     state: {
                        archived: 0,
                        nil: 'Y'
                     }
                   }}> Nil Orders </Link> 
                </Menu.Item>
  
                <Menu.Item key="122">
                  <Link to={{
                     pathname: '/orders',
                     state: {
                        archived: 0,
                        nil: 'N'
                     }
                   }}> Not Nil Orders</Link> 
                </Menu.Item>
  
                <Menu.Item key="123">
                   <Link to={{
                     pathname: '/archived_orders',
                     state: {
                        archived: 1,
                        nil: 'A'
                     }
                   }}> Archived Orders</Link>
                </Menu.Item>
                
                {
                  (this.isUserAdmin === 'Y') ?
                    <>
                      <Menu.Item key="124">
                      <Link to="/orderformat">  Order Formats</Link>
                      </Menu.Item>
        
                      <Menu.Item key="125">
                        <Link to="/ordercat"> Order Categories</Link>
                      </Menu.Item>
                      
                      <Menu.Item key="126">
                      <Link to="/orderlang">  Order Languages</Link>
                      </Menu.Item>
                    </>
                  :
                  ''
                }
  
              </SubMenu>
  
              {
                  (this.isUserAdmin === 'Y') ?
                  <>
                    <Menu.Item key="2" icon={<TeamOutlined />}>
                      <Link to="users">
                        Users
                      </Link>
                    </Menu.Item>
                    
                    
                    <SubMenu key="sub1" icon={<BookOutlined />} title="Blogs">
        
                      <Menu.Item key="3">
                        <Link to="/admin_blogs">
                          Blogs
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="4">
                        <Link to="/admin_blogcat">
                          Blog Categories
                        </Link>
                      </Menu.Item>
        
                    </SubMenu>
        
        
                    <SubMenu key="sub2" icon={<AudioOutlined />} title="Podcasts">
                      <Menu.Item key="6">Podcasts</Menu.Item>
                      <Menu.Item key="8">Podcasts Categories</Menu.Item>
                    </SubMenu>
        
                    <SubMenu key="sub9" icon={<ToolOutlined />} title="Jobs">
                <Menu.Item key="130">Jobs</Menu.Item>
                <Menu.Item key="131">Jobs Categories</Menu.Item>
              </SubMenu>
                  </>
                  :
                  ''
                }
            </Menu>
  
  
          </Sider>
  
  
          <Layout className="site-layout">
  
  
            <Content style={{ margin: '0 16px' }}>
  
  
              {this.props.children}
  
  
            </Content>
  
          </Layout>
  
  
  
        </Layout>
      );
    }
  }
}

export default AppDashboardLayout
