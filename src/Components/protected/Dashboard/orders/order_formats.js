import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";


// dependencies
import { Modal } from 'antd';
import Moment from 'react-moment';
import M from 'materialize-css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// import helpers
import { URL, fetchData, postData } from '../../../../Helpers/config'
import appauth from '../../../../appauth';


// styles
import styles from '../dashboard.module.css'

export default function OrderFormat() {

    
    const [orderformats, setOrderFormats] = useState([])
    
    const [mvisible, setMvisible] = useState(false)
    const [modAction, setModAction] = useState("")
    const [modHeader, setModHmodHeader] = useState("Nyenjeri Orders")


    // set inputs
    const [formattitle, setFormattitle] = useState('')
    const [formatnotes, setFormatnotes] = useState('')
    const [formatURL, setFormatURL] = useState('')
    const [rowid, setRowid] = useState('')



    // call seerver data
    useEffect(() => {

        M.AutoInit();

        let url_order_formats = `${URL}/api/order_format?_token=${appauth.apptoken}`
        let data = {
            "_token": appauth.apptoken
        }


        fetchData(url_order_formats, {data}).then(data=>{
            (data.code === -1) ? toast.error("Fatal Error while fetching data") : setOrderFormats(data.msg)
        })

    },[])


    // submit data
    const { register, handleSubmit, errors } = useForm();


    const onSubmit = data => {
        let url =''
        if(data.url === 'C') {
            url = `${URL}/api/order_format`
        }else{
            url = `${URL + data.url}` 
        }  
            
        postData(url, data)
            .then(data => {
                console.log(data);
                if(data.code === -1) {
                        toast.error("Fatal Error while fetching data") 
                }else {
                    toast.success("Data posted ")
                    setTimeout(() => {
                        window.location.reload()
                    }, 200);
                }
                setMvisible(false)
            })
            .catch(err => console.error(err))
        
    }




    const delRecord = (id) => {
        let url = `${URL}/api/del_order_format/${rowid}`

        console.log(id)

        let confirmation = window.confirm("Are you sure you want to delete the record")

        console.log( url);
        if (confirmation) {
            
            fetchData(url)
                .then(data => {
                    if(data.code === -1) {
                        toast.error(data.msg.msg) 
                    }else {
                        toast.success(data.msg.msg)
                        setTimeout(() => {
                            window.location.reload()
                        }, 3000);
                    }
                    setMvisible(false)
                })
                .catch(err => console.error(err))
        }else{
            setMvisible(false)
        }

    } 

    


    // edit order
    const editOrderFormat = (id) => {
        // call server for data
        if (id === -1) {

            setFormattitle('')
            setFormatnotes('')
            setFormatURL(`C`)
            setModHmodHeader("Add Order Category")

        }else{
            

            fetchData(`${URL}/api/get_order_format/${id}`)
            .then(data => {
                if(data.code === -1) {
                    toast.error("Unable to fetch data")
                }else{
                    let dat = data.msg
                    console.log(dat);
                    
                    setFormattitle(dat.name)
                    setFormatnotes(dat.description)
                    setRowid(dat.id)

                }
                setFormatURL(`/api/update_order_format/${id}`)
            })
            .catch(
                error => console.error(error)
            )
    
            setModHmodHeader("Edit Order Format")

        }
        setModAction('edit_order')
        setMvisible(true)
    }






    // render modal
    const renderMdata = (action = "") => {
        let template = null

        if (action === 'edit_order') {
            template = (
                <div>
                    <div className="row">
                        <form className="col s12" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">

                                <input name="url" defaultValue={formatURL} ref={register()} type="hidden"/>
                                <input type="hidden" defaultValue={appauth.user_id} name="user_id" ref={register()}/>
                                <input type="hidden" defaultValue='1' name="status" ref={register()}/>
                                <input type="hidden" defaultValue={appauth.apptoken} name="_token" ref={register()}/>

                                <div className="default-field col s12">
                                    <label htmlFor="title">Title</label>
                                    <input id="title" 
                                            defaultValue={formattitle} 
                                            name="name" type="text" 
                                            ref={register({ required: true })}
                                            onChange = {(e) => setFormattitle(e.target.value)} />
                                    {errors.name && <span className="red_message">This field is required</span>}
                                </div>

                                <div className="default-field col s12">
                                    <label htmlFor="description"> Description </label>  
                                    <textarea id="description" 
                                            className="materialize-textarea" 
                                            defaultValue={formatnotes} 
                                            name="description"
                                            ref={register({ required: true })}
                                            onChange = {(e) => setFormatnotes(e.target.value)}>
                                    </textarea>
                                    {errors.description && <span className="red_message">This field is required</span>}
                                </div> 

                                {
                                    (formatURL !== 'C') ?
                                        <div className="col s12">
                                            <label htmlFor="archive">Archive</label>
                                            <select id="archive" className="browser-default" name="archive" ref={register()}>
                                                <option value="" disabled defaultValue>Choose your option</option>
                                                <option value="0">No</option>
                                                <option value="1">Yes</option>
                                                
                                            </select>
                                            {errors.archive && <span className="red_message">This field is required</span>}
                                        </div>
                                    : ''

                                }

                                <div className="col s12" style={{marginTop: '2rem'}}>
                                    <input style={{marginRight: "30px"}} id="submit_format" 
                                            className="waves-effect waves-light btn" 
                                            name="update"  
                                            type="submit"/>  
                                   
                                </div>

                            </div>
                        </form>

                        <div className="row">
                            <div className="right-align row_del">
                                    {
                                        (formatURL !== 'C') ?                                            

                                            <button onClick ={(rowid) => delRecord(rowid)} className="waves-effect waves-light btn red ">Delete </button>  
                                        : ''
                                    }

                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            template= (<div>Processing ...</div>)
        }
        return template
    }








    // render orderformats
    const renderorderFormats = () => {
        let template = null

        template = orderformats.map((item, i) => (

                <tr key={i}>
                    <td>{item.name}</td>
                    <td> {item.status} </td>
                    <td> {item.description} </td>
                    <td> 
                        <Moment fromNow>
                            {item.updated_at} 
                        </Moment>
                    </td>
                    <td> <button className="btn waves-effect waves-light green" onClick={() => editOrderFormat(item.id)}>Edit</button> </td>
                </tr>
        ))

        return template
    }














    if(orderformats.length < 1){
        return <h3>Rendering</h3>
    }else{

        return (
            <React.Fragment>
                <div className="container">
                    <ToastContainer />
                    <Modal
                            title={modHeader}
                            visible={mvisible}
                            onOk={()=>setMvisible(false)}
                            onCancel={()=>setMvisible(false)}
                        >
    
                            <div>
    
                                { renderMdata(modAction) }
    
                            </div>
    
    
                    </Modal>
    
    
                    <h3 className={styles.h3m20}>Orders Format</h3>
    
    
                    <button className="btn waves-effect waves-light green" onClick={() => editOrderFormat(-1)}>Add</button>
                    <table className="highlight">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Active</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                        </thead> 
    
                        <tbody>
                        
    
                            {renderorderFormats()}
    
    
                        </tbody>
                    </table>
                
    
                </div>
            </React.Fragment>
        )
    }

}
