import React from 'react'
import { Switch, Route } from 'react-router-dom';

// dependencies
import ProtectedRoute from './AuthRoutes/protected'

// components
import AppLayout from './HOC/layout/applayout'
import appHome from './Components/appHome/apphome'

// academic
import AccPlaceOrder from './Components/Academic/acc_placeorder'
import AccBio from './Components/Academic/acc_bio'
import AccPayrates from './Components/Academic/acc_payrates'
import AccBioDescr from './Components/Academic/acc_bio_description'
import AccServices from './Components/Academic/acc_services'
import AccWorksamples from './Components/Academic/acc_worksamples'

// blogs
import Blogs from './Components/Blogs/blogs'
import singleBlog from './Components/Blogs/blog_single'

// Auth
import Login from './Components/Auth/login'
import Logout from './Components/Auth/logout'


// dashboard
import AppDashboardLayout from './Components/protected/Dashboard/appdashboard_layout'
import Dashboard from './Components/protected/Dashboard/dashboard'

import NilOrders from './Components/protected/Dashboard/orders/nil_orders'
import ArchivedOrders from './Components/protected/Dashboard/orders/archived_orders'
import Orders from './Components/protected/Dashboard/orders/orders'
import OrderView from './Components/protected/Dashboard/orders/order_view'

import OrderFormat from './Components/protected/Dashboard/orders/order_formats'
import OrderCat from './Components/protected/Dashboard/orders/order_categories'
import OrderLang from './Components/protected/Dashboard/orders/order_lang' 
import PlaceOrder from './Components/protected/Dashboard/orders/placeOrder'

// blogs
import AdminBlogCat from './Components/protected/Dashboard/blogs/blog_cats'
import AdminBlogs from './Components/protected/Dashboard/blogs/blogs'
import AdminBlogView from './Components/protected/Dashboard/blogs/blog_view'
import AdminAddBlog from './Components/protected/Dashboard/blogs/add_blog'


// users
import Users from './Components/protected/Dashboard/users/users'




import NotFound from './Components/notFound'

export default function Routes(props) {
    return (
        <React.Fragment>
            <AppLayout {...props}>

                <Switch>

                    {/* load homepage */}
                    <Route path = "/" exact component={appHome}/> 


                    {/* load academic components */}
                    <Route path = "/acc_placeorder" exact component={AccPlaceOrder}/> 
                    <Route path = "/acc_bio" exact component={AccBio}/> 
                    <Route path = "/acc_bio_descr" exact component={AccBioDescr}/> 
                    <Route path = "/acc_payrates" exact component={AccPayrates}/> 
                    <Route path = "/acc_services" exact component={AccServices}/> 
                    <Route path = "/acc_worksamples" exact component={AccWorksamples}/> 



                    {/* Blogs */}
                    <Route path = "/blogs" exact component={Blogs}/> 
                    <Route path = "/single_blog/:id/:user_id" exact component={singleBlog}/> 


                    {/* Auth */}
                    <Route path = "/login" exact component={Login}/> 
                    <Route path = "/logout" exact component={Logout}/> 

                    <AppDashboardLayout>

                        {/* Dashoard Routes */}
                        <ProtectedRoute path = "/dashboard" exact component={Dashboard}/> 

                        {/* orders */}
                        <ProtectedRoute path = "/nil_orders" exact component={NilOrders}/> 
                        <ProtectedRoute path = "/archived_orders" exact component={ArchivedOrders}/> 
                        <ProtectedRoute path = "/orders" exact component={Orders}/> 
                        <ProtectedRoute path = "/placeOrder" exact component={PlaceOrder}/> 
                        <ProtectedRoute path = "/view_order/:id" exact component={OrderView}/> 
                        <ProtectedRoute path = "/orderformat" exact component={OrderFormat}/> 
                        <ProtectedRoute path = "/ordercat" exact component={OrderCat}/> 
                        <ProtectedRoute path = "/orderlang" exact component={OrderLang}/> 

                        {/* blogs */}
                        <ProtectedRoute path = "/admin_blogcat" exact component={AdminBlogCat}/> 
                        <ProtectedRoute path = "/admin_blogs" exact component={AdminBlogs}/> 
                        <ProtectedRoute path = "/admin_addblog" exact component={AdminAddBlog}/> 
                        <ProtectedRoute path = "/admin_view_blog/:id" exact component={AdminBlogView}/> 

                        {/* users */}
                        <ProtectedRoute path = "/users" exact component={Users}/> 

                        {/* <Route component={NotFound}/>  */}
                    </AppDashboardLayout>

                    <Route component={NotFound}/> 

                </Switch>

            </AppLayout>
            
        </React.Fragment>
    )
}
