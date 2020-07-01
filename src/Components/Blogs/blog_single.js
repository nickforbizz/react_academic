import React, { useState, useEffect } from 'react'



// styles
import styles from './blogs.module.css'

import Moment from 'react-moment';
import M from 'materialize-css';
import ReactHtmlParser from 'react-html-parser'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
    CommentOutlined
  } from '@ant-design/icons';

// import helpers
import { URL, fetchData, postData } from '../../Helpers/config'
import appauth from '../../appauth';


export default function BlogSingle(props) {
    let blog_id = (props.match.params.id);

    // states
    const [blog, setBlog] = useState([])
    const [user, setUser] = useState([])


    useEffect(()=>{

        M.AutoInit();

        let url_blog = `${URL}/api/get_blog/${blog_id}`
        let url_user = `${URL}/api/get_user/${appauth.user_id}`
        let data = {
            "_token": appauth.apptoken
        }


        fetchData(url_blog).then(data=>{
            console.log(data);
            
            (data.code === -1) ? toast.error("Fatal Error while fetching data") : setBlog(data.msg.msg)
            
        })

        fetchData(url_user).then(data=>{
            console.log(data);
            
            (data.code === -1) ? toast.error("Fatal Error while fetching data") : setUser(data.msg.msg)
            
        })

            
    },[])

    if(blog.length < 1){
        return (
                <div className="card material-table">
                    <ToastContainer />
                        <h5>Fail to load Data</h5>
                </div>
        )
    }else{
        return (
            <React.Fragment>
                <ToastContainer />
                <div className={"container " + styles.blog_box}>
                    <div className={styles.blog_img} style={{
                        backgroundImage: `url('${URL}/api/uploads/blog_images/${blog.featured_image}')`
                    }}></div>
    
                    <div className="row">


                        <h5 className={styles.blog_title}> {blog.title} </h5>
                        <div className="s12">
                            <div className={styles.blog_cat}> 

                                <span> BY: <b> {user.names} </b> </span>   
                                <span> Updated at: <b> {blog.created_at}</b> </span> 

                                <div className={styles.blog_cat_tag}> {blog.cats.title} </div>  
                            </div>
                            <div className="divider"></div>
                            { ReactHtmlParser(blog.body) }
                        </div>

                        <h5> Comments  <CommentOutlined /> </h5>
                        <div className="divider"></div>
                        <div className={styles.comment}>

                            <textarea></textarea>

                        </div>


                    </div>
                </div>
                
            </React.Fragment>
        )

    }
}
