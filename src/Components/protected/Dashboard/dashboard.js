import React from 'react'


// dependencies
import { Modal } from 'antd';
// import {
//   DesktopOutlined,
//   HomeOutlined,
//   FileOutlined,
//   TeamOutlined,
//   UserOutlined,
//   FormOutlined,
// } from '@ant-design/icons';



// dependencies

// styles
// import styles from './dashboard.module.css'
// import { Link } from 'react-router-dom';





class Dashboard extends React.Component {
  state = {
    collapsed: false,
    modal_visible:false

  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <>

          <h3>Dashboard here </h3>

          <button onClick={()=>(this.setState({modal_visible: true}))}>show </button>

          {/* <Modal_data active={true} /> */}

          <Modal
            title="Basic Modal"
            visible={this.state.modal_visible}
            onOk={()=>this.setState({modal_visible:false})}
            onCancel={()=>this.setState({modal_visible:false})}
          >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>


          </Modal>


      </>
    );
  }
}

export default Dashboard
