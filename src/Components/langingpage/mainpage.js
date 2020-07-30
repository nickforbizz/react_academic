import React, { useState, useEffect } from 'react'

// dependencies
import Maincarousel from '../../Widgets/Carousel/Main/maincarousel';
import M from 'materialize-css';
import ReactHtmlParser from 'react-html-parser';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// import helpers
import { URL } from '../../Helpers/config'
import { Link } from 'react-router-dom';

export default function MainPage(props) {



    // states
    const [blogs, setBlogs] = useState([])



    useEffect(() => {
        const blogs = props.data;
        setBlogs(blogs)
    }, [])


    const loadBlogs = () => {
        let template = null
        if (blogs.length < 1) {
            template =
                <div className="material-table card">
                    <p> No Data Available</p>
                </div>
        } else {
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
                                        {ReactHtmlParser(item.body.substring(0, 200))} <b> ... </b>

                                    </div>
                                    <div className="card-action right-align">
                                        <Link to={`/single_blog/${item.rowid}/${item.id}/${item.user_id}`} className="waves-effect waves-light btn-small"> View </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
        }
        return template
    }


    if (blogs.length < 1) {
        return (<div className="card material-table">
                    <ToastContainer />
                    <h3>Hey Wellcome</h3>
                    <p className=''> Loading Data ... </p>
                </div>)
    }else{
        return (
            <React.Fragment>
    
    
                {/* header tag on phone */}
                <div className="hide-on-med-and-up">
                    <h4>News</h4>
                    <div className='divider'></div>
                </div>
                <ToastContainer />
    
                {/* slider for news */}
                <Maincarousel height={25} data={blogs}/> 
    
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
}
