import React, {useState} from 'react'

import { Modal, Button } from 'antd';


class ModalData extends React.Component {
    state = { visible: false };
  
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    render() {
      // this.props.active
      return (





        <div>


          
          <Button type="primary" onClick={this.showModal}>
            Open Modal
          </Button>


          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>


          </Modal>


        </div>
      );
    }
  }
  

  export default ModalData;