import React from 'react'


// styles
import styles from './acc_bio.module.css'
import SideLeftPage from '../langingpage/sideleftpage'

export default function AccServices() {
    return (
        <React.Fragment>
            <div className="Xcontainer">

            <div  className="row">
                    <div className="col s0 m3">
                        <SideLeftPage />
                    </div>
                    <div className="col s12 m9">

                        <div className="row card" style={{ margin: '1rem' }}>                    
                            
                        
                            <div className="col s12">

                                <h4 style={{padding: '2rem 0 0 0'}}> Our Services</h4> <hr/>

                                <div className="row" style={{padding: '2rem 0'}}>


                                    <div className="col s12 m4">


                                        <div className="card">

                                            <div className="card-image">
                                                <img src="images/Blog-Promotion-101-Illustration-Feature_1290x688_KL.jpg" />
                                            </div>

                                            <p className={"card-title text-center " +styles.card_head }>Card Title</p>

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
                                            </div>
                                            <p className={"card-title text-center " +styles.card_head }>Card Title</p>
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
                                            </div>
                                            <p className={"card-title text-center " +styles.card_head }>Card Title</p>
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
