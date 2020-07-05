import React, { useState, useEffect } from 'react'



// styles
import styles from './blogs.module.css'

import M from 'materialize-css';
import ReactHtmlParser from 'react-html-parser'; 
import Moment from 'react-moment';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
    CommentOutlined, LikeOutlined, EyeOutlined
  } from '@ant-design/icons';

// import helpers
import { URL, fetchData, postData } from '../../Helpers/config'
import appauth from '../../appauth';


export default function BlogSingle(props) {
    let blog_id = (props.match.params.id);
    let user_id = (props.match.params.user_id);

    // states
    const [blog, setBlog] = useState([])
    const [user, setUser] = useState([])
    const [comment, setComment] = useState([])
    const [postview, setPostview] = useState(0)
    const [commentinfo, setCommentinfo] = useState('')


    useEffect(()=>{

        M.AutoInit();

        let url_blog = `${URL}/api/get_blog/${blog_id}`
        let url_blog_view = `${URL}/api/blog_views/${blog_id}`
        let url_user = `${URL}/api/get_user/${user_id}`
        let url_blog_comments = `${URL}/api/get_blog_comments/${blog_id}`
        let data = {
            "_token": appauth.apptoken
        }

        // blog
        fetchData(url_blog, {data}).then(data=>{
            (data.code === -1) ? toast.error("Fatal Error while fetching data")
                               : (data.msg.code === -1) ? toast.error(data.msg.msg) : setBlog(data.msg.msg)   
        })


        // comments
        fetchData(url_blog_comments).then(data=>{
            (data.code === -1) ? toast.error("Fatal Error while fetching data"): setComment(data.msg.msg);         
        })

        // post view
        fetchData(url_blog_view).then(data=>{
            (data.code === -1) ? toast.error("Fatal Error while fetching data"): setPostview(data.msg.msg.length);    
            console.log({data});
                 
        })

        // user 
        if(user_id !== null){
            fetchData(url_user).then(data=>{
                
                (data.code === -1) ? toast.error("Fatal Error while fetching data") : setUser(data.msg.msg)
                
            })
        }
            
    },[])


    const addComment = (id) => {
        let user_id = 0;
        (appauth.user_id === null) ? user_id = 0 : user_id = appauth.user_id
        let blog_id = blog.id
        let url = ''

        console.log(comment);
        

        // add comment
        if (id === -1) {
            url = `${URL}/api/blog_comments`
        }

        if (url !== ''){

            if(commentinfo.trim() === ''){
                toast.warning("Please add comment") 
            }else{

                let data ={
                    'blog_id': blog_id, 
                    'user_id': user_id, 
                    'comment': comment
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
                })
                .catch(err => {
                    console.error(err)
                    toast.error("Fatal Error") 
                })
            }
        }else{
            toast.warning("Could not find location to store comment")
        }
        
        
    }


    const loadCommens = () => {
        return ((comment.length < 1) ?
            <div  className="card material-table">
                <p> Be the first to comment on this </p>
            </div>
        :
            <div  className="card material-table">
                {
                    comment.map((item, i) => (
                        <div key={i}>  
                            <div className="pull_right break_float"><b>_</b> <Moment format = 'LLLL'>{item.created_at}</Moment></div>
                            <b> {item.comment} </b>
                            <hr />
                        </div>
                    ))
                }
            </div>)
    }



    // add a like
    const addLike = () => {
        let url_blog_like = `${URL}/api/blog_likes`
        let data = {"blog_id": blog_id}
         // blog like
         postData(url_blog_like, data).then(data=>{
             console.log(data);
             
            (data.code === -1) ? toast.error("Fatal Error while fetching data")
                               : (data.msg.code === -1) ? toast.error(data.msg.msg) : setBlog(data.msg.msg)   
        })
        // toast.info("Post liked") 
    }

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

                        <div className="s12">

                            <h5> 
                                Comments  <CommentOutlined />  
                                <div className="pull_right break_float">  <LikeOutlined onClick={addLike}/> <small>0</small> </div> 
                                <div className="pull_right break_float" style={{marginRight: '2rem'}}>  <EyeOutlined /> <small> {postview} </small> </div> 
                            </h5>
                            <div className="divider"></div>
                            <div className={styles.comment}>

                                <textarea className={styles.blog_comment_box} 
                                        onChange={(e) => setCommentinfo(e.target.value)}
                                        placeholder="Inserrt comment"
                                ></textarea>

                                <div>
                                    <button className="btn waves-effect waves-light green" 
                                            onClick={() => addComment(-1)}>
                                                Add Comment
                                    </button> 
                                </div>

                                {loadCommens()}  

                            </div>

                        </div>


                    </div>
                </div>
                
            </React.Fragment>
        )

    }
}
