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

export default function BlogCat() {

    
    const [blogcats, setBlogcats] = useState([])
    
    const [mvisible, setMvisible] = useState(false)
    const [modAction, setModAction] = useState("")
    const [modHeader, setModHmodHeader] = useState("Nyenjeri Blog")


    // set inputs
    const [cattitle, setCattitle] = useState('')
    const [catnotes, setCatnotes] = useState('')
    const [catURL, setCatURL] = useState('')
    const [rowid, setRowid] = useState('')


    
    // call seerver data
    useEffect(() => {
      

        M.AutoInit();

        let url_blog_cats = `${URL}/api/blog_category?_token=${appauth.apptoken}`
        let data = {
            "_token": appauth.apptoken
        }


        fetchData(url_blog_cats, {data}).then(data=>{
            (data.code === -1) ? toast.error("Fatal Error while fetching data") : setBlogcats(data.msg)
        })

    },[])


    // submit data
    const { register, handleSubmit, errors } = useForm();

    


    const onSubmit = data => {
        let url =''
        if(data.url === 'C') {
            url = `${URL}/api/blog_category`
        }else{
            url = `${URL + data.url}` 
        }  
        
            
        postData(url, data)
            .then(data => {
                console.log(data);
                if(data.code === -1) {
                    toast.error("Fatal Error while fetching data") 
                }else {
                    (data.msg.code === -1) ? toast.error(data.msg.msg) : toast.success(data.msg.msg);
                    
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }
                setMvisible(false)
            })
            .catch(err => {
                console.error(err)
                toast.error("Fatal Error") 
            })
        
    }



    const delRecord = (id) => {
        let url = `${URL}/api/del_blog_cat/${rowid}`


        let confirmation = window.confirm("Are you sure you want to delete the record")

        console.log( url);
        if (confirmation) {
            toast.info("Processing ...")
            
            fetchData(url)
                .then(data => {
                    console.log(data);
                    
                    if(data.code === -1) {
                        toast.error(data.msg.msg) 
                    }else {
                        
                        (data.msg.code === -1) ? toast.error(data.msg.msg) : toast.success(data.msg.msg);
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




    // edit Blog
    const editBlogCat = (id) => {
        // call server for data
        if (id === -1) {

            setCattitle('')
            setCatnotes('')
            setCatURL(`C`)
            setModHmodHeader("Add Blog Category")

        }else{

            
            fetchData(`${URL}/api/get_blog_cat/${id}`)
            .then(data => {
                if(data.code === -1) {
                    toast.error("Unable to fetch data")
                }else{
                    let dat = data.msg
                    console.log(dat);
                    
                    setCattitle(dat.title)
                    setCatnotes(dat.description)
                    setRowid(dat.id)

                }
                setCatURL(`/api/update_blog_cat/${id}`)
            })
            .catch(
                error => console.error(error)
            )
    
            setModHmodHeader("Edit Blog Category")

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

                                <input name="url" defaultValue={catURL} ref={register()} type="hidden"/>
                                <input type="hidden" defaultValue={appauth.user_id} name="user_id" ref={register()}/>
                                <input type="hidden" defaultValue='1' name="status" ref={register()}/>
                                <input type="hidden" defaultValue={appauth.apptoken} name="_token" ref={register()}/>


                                <div className="default-field col s12">

                                    <label htmlFor="title">Title</label>
                                    <input id="title" 
                                            defaultValue={cattitle} 
                                            name="title" type="text" 
                                            ref={register({ required: true })}
                                            onChange = {(e) => setCattitle(e.target.value)} />
                                    {errors.name && <span className="red_message">This field is required</span>}

                                </div>

                                <div className="default-field col s12">

                                    <label htmlFor="description"> Description </label>  
                                    <textarea id="description" 
                                            className="materialize-textarea" 
                                            defaultValue={catnotes} 
                                            name="description"
                                            ref={register({ required: true })}
                                            onChange = {(e) => setCatnotes(e.target.value)} 
                                            ></textarea>
                                    {errors.description && <span className="red_message">This field is required</span>}
                                </div>

                                {
                                    (catURL !== 'C') ?
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
                                            type="submit"
                                    />                                     
                                </div>


                            </div>
                        </form>

                        <div className="row">
                            <div className="right-align row_del">
                                    {
                                        (catURL !== 'C') ?                                            

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




    // render Blogcats
    const renderBlogcat = () => {
        let template = null

        template = blogcats.map((item, i) => (

                <tr key={i}>
                    <td>{item.title}</td>
                    <td> {(item.status === 1) ? "Yes" : "No"} </td>
                    <td> {item.description} </td>
                    <td> 
                        <Moment fromNow>
                            {item.created_at} 
                        </Moment>
                    </td>
                    <td> <button className="btn waves-effect waves-light green" onClick={() => editBlogCat(item.id)}>Edit</button> </td>
                </tr>
        ))

        return template
    }








    if(blogcats.length < 1){
        return (
                <div className="card material-table">
                    <p>No data currentrly available</p>
                    <button className="btn waves-effect waves-light green" onClick={() => editBlogCat(-1)}>Add Blog Category</button>




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


                </div>
                )
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
    
    
                    <h3 className={styles.h3m20}>Blog Categories</h3>
    
    
                    <button className="btn waves-effect waves-light green" onClick={() => editBlogCat(-1)}>Add</button>
                    <table className="highlight">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Active</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                        </thead> 
    
                        <tbody>
                        
    
                            {renderBlogcat()}
    
    
                        </tbody>
                    </table>
                
    
                </div>
            </React.Fragment>
        )
    }

    }

