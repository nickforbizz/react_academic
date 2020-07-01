import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';



// dependencies
import M from 'materialize-css';
import { Modal } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// widjets
// import ModalProcessing from '../../Widgets/Modal/modal_processing'

// styles
import styles from '../../../Academic/acc_placeorder.module.css'


// import helpers
import { URL } from '../../../../Helpers/config'
import appauth from "../../../../appauth";
 



export default function AccPlaceOrder(props) {

    // decrare states
    const [blogCat, setBlogCat] = useState([]);
    const [blogFormat, setBlogFormat] = useState([]);
    const [blogLang, setBlogLang] = useState([]);
    const [visible, setVisible] = useState(false);
    const [feedback, setFeedback] = useState("processing ...");
    const [wordcount, setWordcount] = useState(275);


    useEffect(() => {

        M.AutoInit();


        // call categories
        callFromServer(`${URL}/api/order_cat`, setBlogCat)
        // formats
        callFromServer(`${URL}/api/order_format`, setBlogFormat)
        // lang
        callFromServer(`${URL}/api/order_lang`, setBlogLang)


        // fetch(`${URL}/api/order_cat`)
        // .then(response => response.json())
        // .then(data => {
        //     setBlogCat(data)
        // })


    }, [])



    const { register,reset, handleSubmit, errors } = useForm();

    const onSubmit = data => {


        
        let url = `${URL}/api/nil_order`
        
        let data2 = new FormData(document.querySelector("#nil_order"));
        
        showModal()
        axios.post(url, data2)
        .then(res => {

            handleCancel()
            if(res.data.code === 1){
                setFeedback("Data was posted Successfully ")
                reset()
                setWordcount(275)
            }else{
                setFeedback("An error occured")
            }
            showModal()
        })
        .catch(err => {
            console.error(err)
            toast.error("Error ")
        })
    };


    const calcWordcount = (event) => {
        let val = event.target.value * 275
        setWordcount(val)
    }



    // call data from server
    const callFromServer = (url, stateset) => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            stateset(data)
        })
    }

    const displayOrderCategories = () => {
        // console.log({blogCat})
        
        if(blogCat.length < 1){
            var cats = <option> -- select --</option>
        }else{

            cats = blogCat.map((item, i) =>  (
    
                <option key={i} value={item.id}>{item.name}</option>
     
            ))
        }
        return cats;
    }

    // formats
    const displayOrderFormats = () => {
        // console.log({blogFormat})
        
        if(blogFormat.length < 1){
            var cats = <option> -- select --</option>
        }else{

            cats = blogFormat.map((item, i) =>  (
    
                <option key={i} value={item.id}>{item.name}</option>
     
            ))
        }
        return cats;
    }

    // displayOrderLang
    const displayOrderLang = () => {
        // console.log({blogFormat})
        
        if(blogLang.length < 1){
            var cats = <option> -- select --</option>
        }else{

            cats = blogLang.map((item, i) =>  (
    
                <option key={i} value={item.id}>{item.name}</option>
     
            ))
        }
        return cats;
    }

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
  return (

    <div className="container">

        <div className="row">
            <div className={styles.header + " col s12"}>


                <div className= 'section' style={{marginTop: '6rem'}}>

                    <h4> Place your order     </h4>
                    <p> We will commounicate to you for more details </p>


                    {/* <ModalProcessing ref="child"/> */}



                </div>

            </div>
            <div className="divider"></div>

            <div className="col s12">

                    <ToastContainer />
                    <Modal
                        title="Please wait"
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        >
                        <p id="processing_data"> { feedback }</p>
                    </Modal>

                    <div className="section">

                        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" id="nil_order">
                            

                            <input type="hidden" defaultValue={appauth.user_id} name="user_id" ref={register()}/>
                            <input type="hidden" defaultValue={appauth.apptoken} name="_token" ref={register()}/>
                            <input type="hidden" defaultValue={'N'} name="nil" ref={register()}/>


                            <div className="input-field col s12">
                                <label htmlFor="email">Email</label>
                                <input id="email" name="email" type="text" 
                                        className="validate" 
                                        defaultValue={appauth.user_email}
                                        ref={register({ required: true })}/>
                                {errors.email && <span className="red_message">This field is required</span>}
                            </div>

                            <div className="input-field col s12">
                                <input id="title" name="title" type="text" className="validate" ref={register({ required: true })}/>
                                <label htmlFor="title">Title</label>
                                {errors.title && <span className="red_message">This field is required</span>}
                            </div>

                            <div className="col s4">
                                <label htmlFor="category">Category</label>
                                <select id="category"  className="browser-default" name="category_id" ref={register({ required: true })}>
                                    <option value="" disabled defaultValue>Choose your option</option>
                                    { displayOrderFormats() }
                                </select>
                                {errors.category_id && <span className="red_message">This field is required</span>}
                            </div>

                            <div className="col s4">
                                <label htmlFor="format">Format</label>
                                <select id="format" className="browser-default" name="format_id" ref={register({ required: true })}>
                                     <option value="" disabled defaultValue>Choose your option</option>
                                    { displayOrderCategories() }
                                    
                                </select>
                                {errors.format_id && <span className="red_message">This field is required</span>}
                            </div>

                            <div className="col s4">
                                <label htmlFor="language">Language</label>
                                <select id="language" className="browser-default"  name="language_id" ref={register({ required: true })}>
                                    <option value="" disabled defaultValue>Choose your option</option>
                                    { displayOrderLang() }
                                </select>
                            </div>

                            <div className="input-field col s4">
                                <input id="pages" name="pages" type="number" className="validate"  ref={register({ required: true })} onChange = {(e) => calcWordcount(e)}/>
                                <label htmlFor="pages">Page(s)</label>
                                {errors.pages && <span className="red_message">This field is required</span>}
                            </div>

                            <div className="input-field col s4">
                                <label htmlFor="word_count">Word Count</label>
                                <input id="word_count" name="word_count" 
                                        type="number" 
                                        className="validate" value={wordcount} ref={register({ required: true })} onChange = {(e) => setWordcount(e.target.value)}/>
                                {errors.word_count && <span className="red_message">This field is required</span>}
                            </div>

                            <div className="input-field col s12">
                                <i className="material-icons prefix">mode_edit</i>
                                <textarea id="notes" name="notes" className="materialize-textarea"></textarea>
                                <label htmlFor="notes">Notes</label>
                            </div>


                            <div className="input-field col s12">

                                    <p> Documents <small> <i> - (hold CTRL to select multiple docs)</i></small> </p>
                                    <input type="file" id="docs" className="browser-default" name="file" multiple />
                                
                            </div>




                        <br/>
                        <div className="input-field col s12">

                            <input className="btn" type="submit" />
                        </div>
                        
                        </form>

                    </div>


            </div>
        </div>

    </div>




    
  );
}