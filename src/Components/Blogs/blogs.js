import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// components
import Maincarousel from '../../Widgets/Carousel/Main/maincarousel';

// styles
import styles from './blogs.module.css'

import M from 'materialize-css';
import ReactHtmlParser from 'react-html-parser'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// import helpers
import { URL, fetchData } from '../../Helpers/config'
import appauth from '../../appauth';

export default function Blogs() {


    // states
    const [blogs, setBlogs] = useState([])


    useEffect(()=>{

        M.AutoInit();

        let url_blog = `${URL}/api/blogs?_token=${appauth.apptoken}`
        let data = {
            "_token": appauth.apptoken
        }


        fetchData(url_blog, {data}).then(data=>{
            console.log(data);
            
            if(data.code === -1){
                toast.error("Fatal Error while fetching data")
            }else{
                (data.msg.code === -1) ? toast.error("Fatal Error while fetching data") : setBlogs(data.msg.msg)
            }
            
        })


        

    },[])


    const blogCard = () => {
        let template = null
      

        template = blogs.map((item, i) => (

            <div className="card horizontal" key={i}>

                <div className="card-image imageDiv" 
                        style={{ 
                        background: `url('${URL}/api/uploads/blog_images/${item.featured_image}')`
                        }}
                    >
                </div>

                <div className="card-stacked">
                <div className="card-content">
                    <h5> {item.title} </h5>
                    <div className="divider"></div>
                    { ReactHtmlParser(item.body.substring(0, 400)) } <b> ... </b>
                </div>

                    <div className="card-action right-align">
                        <Link to={`/single_blog/${item.id}`} className="waves-effect waves-light btn-small"> View </Link>
                    </div>

                </div>
            </div>

        ))
    

        return template
    }


    console.log(blogs);

    if(blogs.length < 1 ){

        return (<div className="card material-table">
            <ToastContainer />
            <p className={styles.nodata}> No Data Available </p>
        </div>)

    }else{

        return (
            <React.Fragment>
    
                <div className="container">
    
                    <ToastContainer />
    
                    <Maincarousel height={25}/>
    
    
    
                     {/* cards for news */}
                     { blogCard() }
    
    
                      
    
                </div>
            </React.Fragment>
        )
    }
}
