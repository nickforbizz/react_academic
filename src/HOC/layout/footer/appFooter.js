import React from 'react'



// styles
import styles from './appfooter.module.css'

export default function appFooter() {
    return (
        <React.Fragment>

            <div className="">
                <div className={styles.footer_box}>
                    This is the footer where we will disdiv cllay some information 
                    <p>Made with love by <a className="greenBlue" href="https://www.youtube.com" target="blank"> DigiFix </a> </p>
                </div>
            </div>
        </React.Fragment>
    )
}
