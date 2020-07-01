import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';


// dependencies
import M from 'materialize-css';
import AppAuth from '../../../appauth'

import './header.css';

export default function AppHeader() {

    useEffect(() => {

    
        var header = document.getElementById("myHeader");
        var sticky = header.offsetTop;
        window.onscroll = function() {
          handleScrollHeader(header, sticky, 'sticky')
        };
    
        
        let sidenav = document.querySelector('.sidenav');
        M.Sidenav.init(sidenav, {});
        document.addEventListener('DOMContentLoaded', function() {
          var elems = document.querySelectorAll('.collapsible');
          M.Collapsible.init(elems);
        });
      }, [])
      const handleScrollHeader = (header, sticky, cls) => {
        if (window.pageYOffset > sticky) {
          header.classList.add(cls);
        } else {
          header.classList.remove(cls);
        }
      }

      


      const renderLogUser = () => {
        let template = null
        
        if(AppAuth.isAuthenticated) {
          template = <li><Link to="/logout">Logout</Link></li>

        }else{
          template = <li><Link to="/login">Login</Link></li>

        }
        
          

        return template
      }


      renderLogUser()



    return (
        <React.Fragment>
            <div>
                <div className="row headTop">
                {/* <div className="col s12">This div is 12-columns wide on all screen sizes</div> */}
                  <div className="col s4">
                  <i className="fa fa-facebook-official f_icon" aria-hidden="true"></i> 
                  <i className="fa fa-instagram f_icon" aria-hidden="true"></i>
                  <i className="fa fa-twitter-square f_icon" aria-hidden="true"></i>
                  <i className="fa fa-linkedin-square f_icon" aria-hidden="true"></i>
                  </div>
                  <div className="col s8">
                    <div className="right-align">
                        <strong> <i className="fa fa-phone-square f_icon" aria-hidden="true"></i> +254 704 147029 </strong> 
                        <p className="hide-on-med-and-up"></p>
                        <strong> <i className="fa fa-envelope f_icon ml-2" aria-hidden="true"></i> support@nyenjeri.com </strong>
                    </div>
                  </div>
                </div>
            </div>
            
            <nav className="nav_bar nav-wrapper stick_them" id="myHeader">
                <div className="">
                  <Link to="/" className="brand-logo" >Nyenjeri.com</Link>
                  <Link to="#!" data-target="mobile-demo" className="sidenav-trigger">
                    <i className="material-icons">menu</i>
                  </Link>

                  <ul className="right hide-on-med-and-down">
                      <li><Link to="/acc_bio">Academic</Link></li>
                      <li><Link to="/blogs">Blogs</Link></li>
                      <li><Link to="/">Jobs</Link></li>
                      <li><Link to="/">Contact</Link></li>
                      <li><Link to="/">About Us</Link></li>
                      {renderLogUser()}
                  </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
              <li><Link to="/acc_bio">Academic</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/">Jobs</Link></li>
              <li><Link to="/">Contact</Link></li>
              <li><Link to="/">About Us</Link></li>
              {renderLogUser()}
            </ul>


        </React.Fragment>
    )
}
