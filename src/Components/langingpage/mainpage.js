import React, { useState, useEffect } from 'react'

// dependencies
import Maincarousel from '../../Widgets/Carousel/Main/maincarousel';
import M from 'materialize-css';
import ReactHtmlParser from 'react-html-parser'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// import helpers
import { URL, fetchData } from '../../Helpers/config'
import appauth from '../../appauth';

export default function MainPage() {



    const [blogs, setBlogs] = useState([])


    // fsfs
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


    const loadBlogs = () => {
        let template = null
        if(blogs.length < 1){
            template = 
            <div className="material-table card">
                <p> No Data Available</p>
            </div>
        }else{
            template =
            <div className="material-table card">
                {
                    blogs.map((item, i) => (
                        <div className="card horizontal" key={i}>
                            <div className="card-image imageDiv"
                                style={{ 
                                    background: `url('${URL}/api/uploads/blog_images/${item.featured_image}')`
                                    }}
                            >
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                    <p>
                                    { ReactHtmlParser(item.body.substring(0, 200)) } <b> ... </b>
                                    </p>
                                    
                                </div>
                                <div className="card-action right-align">
                                    <a href="#!" className="waves-effect waves-light btn-small green">View</a>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        }
        return template
    }



    return (
        <React.Fragment>            
                

                {/* header tag on phone */}
                <div className="hide-on-med-and-up">
                    <h4>News</h4>
                    <div className='divider'></div>
                </div>

                {/* slider for news */}
                <Maincarousel height={25}/>

                <div className="col s12 m7">
                    {/* header on lg devices */}
                    <h4 className="">News</h4>

                    {/* cards for news */}
                    {
                        loadBlogs()
                    }
                



                
                </div>


            

            
        </React.Fragment>
    )
}
