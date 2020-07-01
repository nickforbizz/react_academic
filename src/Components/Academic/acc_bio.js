import React from 'react'
import { Link } from 'react-router-dom'


// styles
import styles from './acc_bio.module.css'
import SideLeftPage from '../langingpage/sideleftpage'

export default function AccBio() {
    return (
        <React.Fragment>
            <div className="Xcontainer">


                <div  className="row">
                    <div className="col s0 m3">
                        <SideLeftPage />
                    </div>
                    <div className="col s12 m9">


                        <div className="row card" style={{ margin: '1rem' }}>
                            
                            <div className="col s12 m6">
                                <div className={styles.bio_img} style={{
                                    backgroundImage: `url('/images/people-group-cover.png')`
                                }}>

                                </div>
                            </div>
                            <div className="col s12 m6" style={{ marginTop: "6rem"}}>

                                <h4 className="Xcenter-align"> Bio</h4>

                                <div className="divider"></div>

                                <div className="section">
                                    <p>
                                    Why do we use it?
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

                                    </p>
                                </div>

                            </div>
                        
                            <div className="col s12">

                                <h4 style={{padding: '2rem 0'}}> Hot Deals</h4> <hr/>

                                <div className="row">



                                    <div className="col s12 m4">


                                        <div className="card">
                                            <div className="card-image">
                                            <img src="images/Blog-Promotion-101-Illustration-Feature_1290x688_KL.jpg" />
                                            <span className="card-title">Card Title</span>

                                            <Link to="/acc_bio_descr" className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></Link>

                                            </div>
                                            <div className="card-content">
                                            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                                            </div>
                                        </div>
                                        {/* card */}


                                    </div>


                                    <div className="col s12 m4">


                                        <div className="card">
                                            <div className="card-image">
                                            <img src="images/blogs-and-articles-500x500.jpg" />
                                            <span className="card-title">Card Title</span>
                                            <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
                                            </div>
                                            <div className="card-content">
                                            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                                            </div>
                                        </div>
                                        {/* card */}


                                    </div>


                                    <div className="col s12 m4">


                                        <div className="card">
                                            <div className="card-image">
                                            <img src="images/blogs-versus-articles.jpg" />
                                            <span className="card-title">Card Title</span>
                                            <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
                                            </div>
                                            <div className="card-content">
                                            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                                            </div>
                                        </div>
                                        {/* card */}


                                    </div>



                                </div>

                            </div>
                        </div>
                    
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}
