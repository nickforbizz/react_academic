import React from 'react'


// styles
import styles from './acc_bio.module.css'

export default function AccBioDescription(props) {
    return (
        <React.Fragment>
            <div className="container">

                <div class="row">


                    <div class="col s12">

                    <div className={styles.bio_img_descr} style={{
                            backgroundImage: `url('/images/blogs.jpg')`
                        }}></div>

                    </div>

                    <div class="col s12">
                        <h4 className={styles.header_descr}>Test env</h4>
                        <div className="divider"></div>
                        <p className={styles.info_descr} >I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                    </div>


                </div>

            </div>
        </React.Fragment>
    )
}
