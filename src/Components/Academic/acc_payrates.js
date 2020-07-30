import React from 'react'


// styles
import styles from './acc_bio.module.css'
import SideLeftPage from '../langingpage/sideleftpage'

export default function AccPayrates(props) {
    return (
        <React.Fragment>
            <div className="Xcontainer">

                <div  className="row">
                        <div className="col s0 m3">
                            <SideLeftPage />
                        </div>
                        <div className="col s12 m9 green">

                            <div className="row card" style={{ margin: '1rem' }}>
                                
                                <div className="col s12 m6">
                                    <div className={styles.bio_img} style={{
                                        backgroundImage: `url('/images/0318_RW_Marconi.jpg')`
                                    }}>

                                    </div>
                                </div>
                                <div className="col s12 m6" style={{ marginTop: "6rem"}}>

                                    <h4 className="Xcenter-align"> Pay Rates</h4>

                                    <div className="divider"></div>

                                    <div className="section">
                                        <ul className="collection">
                                            
                                            <li className="collection-item avatar">
                                            <i className="material-icons circle">folder</i>
                                            <span className="title">Basic Package</span>
                                                <ul className="collection">
                                                    <li className="collection-item"> Pantual Deliverly </li>
                                                    <li className="collection-item"> Online Support  </li>
                                                    <li className="collection-item"> Online Support2  </li>
                                                </ul>
                                            </li>
                                            <li className="collection-item avatar">
                                            <i className="material-icons circle green">insert_chart</i>
                                            <span className="title">Premium Package</span>
                                                <ul className="collection">
                                                    <li className="collection-item"> Pantual Deliverly </li>
                                                    <li className="collection-item"> Online Support  </li>
                                                    <li className="collection-item"> Online Support2  </li>
                                                </ul>
                                            </li>
                                            <li className="collection-item avatar">
                                            <i className="material-icons circle red">play_arrow</i>
                                            <span className="title">Platinum Package</span>
                                                <ul className="collection">
                                                    <li className="collection-item"> Pantual Deliverly </li>
                                                    <li className="collection-item"> Online Support  </li>
                                                    <li className="collection-item"> Online Support2  </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            
                            
                            </div>
                        
                        </div>
                </div>

            </div>
        </React.Fragment>
    )
}
