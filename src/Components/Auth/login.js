import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom"
import { useForm } from "react-hook-form";
import axios from 'axios';


// dependencies
import M from 'materialize-css';
import { Modal } from 'antd';
import AppAuth from '../../appauth'


// styles
import styles from './auth.module.css'

// import helpers
import { URL } from '../../Helpers/config'


export default function Login(props) {


    // modal funcs
    const showModal = () => {
        setVisible(true)
      };
    
      const handleOk = e => {
        // console.log(e);
        setVisible(false)
      };
    
     const  handleCancel = e => {
        // console.log(e);
        setVisible(false)
    }
    // modal end

    const [visible, setVisible] = useState(false);
    const [apptoken, setApptoken] = useState('');
    const [feedback, setFeedback] = useState("processing ...");

    useEffect(() => {

        M.AutoInit();


    },[])



    // submit data
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {

        let url = `${URL}/api/login`

        let token = Buffer.from(`${data.username}:${data.password}`, 'utf8').toString('base64')

        showModal()
        axios.get(url,{ headers: {
            'Authorization': `Basic ${token}`
          }})
        .then(res => {

            handleCancel()
            if(res.data.code === 1){

                setFeedback(res.data.msg)
                setApptoken(res.data.token)

                AppAuth.authenticate(res.data)

            }else{

                setFeedback(res.data.msg)

            }
            showModal()
        })
        .catch(err => {
            console.error(err)
            setFeedback("Fatal error")
        })
    }


    const lets_redirect = AppAuth.isAuthenticated

    if (lets_redirect === true){
        // window.location.reload()
        return (
            <Redirect to='/dashboard' />
            )
    }

    return (

        <React.Fragment>


            <Modal
                title="Please wait"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                <p id="processing_data"> { feedback }</p>
            </Modal>

            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"row " + styles.margin20}>
                    <h5>Login here with your credentials </h5>
                    <div className="input-field col s12">
                        <input  id="email" type="email" name="username" className="validate" ref={register({ required: true })} />
                        <label htmlFor="email">Email</label>
                        {errors.username && <span className="red_message">This field is required</span>}
                    </div>
                    <div className="input-field col s12">
                        <input id="passwd" type="password" name="password" className="validate" ref={register({ required: true })} />
                        <label htmlFor="passwd">Password</label>
                        {errors.password && <span className="red_message">This field is required</span>}
                    </div>

                    <div className="input-field col s12">
                        <input  type="submit" className="button" />
                    </div>
                </div>
                </form>
            </div>
        </React.Fragment>
    )
}
