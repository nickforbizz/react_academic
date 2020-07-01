import React from 'react';
import 'materialize-css/dist/css/materialize.min.css'


// from antd
// import { Layout  } from 'antd';

// components
import AppHeader from './header/appheader'
import AppFooter from './footer/appFooter'


// styles
import  './applayout.css'


// instanciations
// const {  Footer } = Layout;

export default function AppLayout(props) {
    

    return (
        <React.Fragment>

            <AppHeader/>


                {props.children}


           
            <AppFooter />


            
        </React.Fragment>
    )
}
