import React from 'react'


// dependencies
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
// import helpers
import { URL, fetchData } from '../../../Helpers/config'
import { ToastContainer, toast } from 'react-toastify';


class Dashboard extends React.Component {
  state = {
    collapsed: false,
    modal_visible:false,
    // count totals
    nil_orders: 0,
    orders: 0,
    archived_orders: 0,
    order_formats: 0,
    order_categories: 0,
    blogs: 0,
    blog_categories: 0,

  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  componentDidMount() {
    let fetch_totals = `${URL}/api/fetch_totals`

        fetchData(fetch_totals).then(data=>{
            
            if(data.code === -1){
              toast.error("Fatal Error while fetching data")
            }else{
              this.setState({ 
                nil_orders: data.msg.msg.nil_orders,
                orders: data.msg.msg.orders,
                archived_orders: data.msg.msg.archived_orders,
                order_formats: data.msg.msg.order_formats,
                order_categories: data.msg.msg.order_cats,
                blogs: data.msg.msg.blogs,
                blog_categories: data.msg.msg.blog_cats,
               });
            } 
        })
  }

  render() {
    return (
      <>
          {/* <Modal_data active={true} /> */}

          <Modal
            title="Basic Modal"
            visible={this.state.modal_visible}
            onOk={()=>this.setState({modal_visible:false})}
            onCancel={()=>this.setState({modal_visible:false})}
          >
                <p>Some contents...</p>
          </Modal>
          <ToastContainer />


          <div className="card">
              <h3>Dashboard </h3>
              <div className="divider"></div>
              <div className="row">
                <div className="s12">

                    <div className="card material-table academic">

                      <h5>Academic   <i className="small material-icons">class</i> </h5>
                      <div className="row">

                        <div className="col s12 m4">
                          <div className="card blue-grey darken-1">
                            <span className="new badge"  data-badge-caption="Total"> {this.state.nil_orders} </span>  
                            <div className="card-content white-text" style={{height: "9rem"}}>
                              <span className="card-title">Nil Orders 
                              </span>
                              <p>Orders Placed by Clients who havent registered to the system</p>
                            </div>
                            <div className="card-action">
                              <Link to={{
                                  pathname: '/nil_orders',
                                  state: {
                                      archived: 0,
                                      nil: 'Y'
                                  }
                                }}> Visit
                              </Link> 
                            </div>
                          </div>
                        </div>
                        {/* end col */}

                        <div className="col s12 m4">
                          <div className="card blue-grey darken-1">
                            <span className="new badge"  data-badge-caption="Total"> {this.state.orders}  </span>  
                            <div className="card-content white-text" style={{height: "9rem"}}>
                              <span className="card-title"> Users Orders </span>
                              <p>Orders Placed by Clients who have registered to the system</p>
                            </div>
                            <div className="card-action">
                              <Link to={{
                                  pathname: '/orders',
                                  state: {
                                      archived: 0,
                                      nil: 'N'
                                  }
                                }}> Visit
                              </Link> 
                            </div>
                          </div>
                        </div>
                        {/* end col */}

                        <div className="col s12 m4">
                          <div className="card blue-grey darken-1">
                            <span className="new badge"  data-badge-caption="Total"> {this.state.archived_orders}  </span>  
                            <div className="card-content white-text" style={{height: "9rem"}}>
                              <span className="card-title">Archived Orders </span>
                              <p> Completed Orders and user satisfied</p>
                            </div>
                            <div className="card-action">
                              <Link to={{
                                  pathname: '/archived_orders',
                                  state: {
                                      archived: 1,
                                      nil: 'A'
                                  }
                                }}> Visit
                              </Link> 
                            </div>
                          </div>
                        </div>
                        {/* end col */}

                        <div className="col s12 m4">
                          <div className="card blue-grey darken-1">
                            <span className="new badge"  data-badge-caption="Total"> {this.state.order_formats}  </span>  
                            <div className="card-content white-text" style={{height: "9rem"}}>
                              <span className="card-title">Formats</span>
                              <p>Formats that a client can request on an Order</p>
                            </div>
                            <div className="card-action">
                              <Link to="/orderformat"> Visit </Link> 
                            </div>
                          </div>
                        </div>
                        {/* end col */}


                        <div className="col s12 m4">
                          <div className="card blue-grey darken-1">
                            <span className="new badge"  data-badge-caption="Total"> {this.state.order_categories}  </span>  
                            <div className="card-content white-text" style={{height: "9rem"}}>
                              <span className="card-title">Categories </span>
                              <p>Categories that a client can request on an Order</p>
                            </div>
                            <div className="card-action">
                              <Link to="/ordercat"> Visit
                              </Link> 
                            </div>
                          </div>
                        </div>
                        {/* end col */}

                      </div>
                      {/* end row */}


                    </div>
                    {/* end academic */}

                    <div className="card material-table blogs">

                      <h5>Blogs   <i className="small material-icons">format_quote</i> </h5>
                      <div className="row">

                        <div className="col s12 m4">
                          <div className="card blue-grey darken-1">
                            <span className="new badge"  data-badge-caption="Total"> {this.state.blogs}  </span>  
                            <div className="card-content white-text" style={{height: "9rem"}}>
                              <span className="card-title">Blogs</span>
                              <p>Blogs Posted</p>
                            </div>
                            <div className="card-action">
                              <Link to="/admin_blogs"> Visit
                              </Link> 
                            </div>
                          </div>
                        </div>
                        {/* end col */}

                        <div className="col s12 m4">
                          <div className="card blue-grey darken-1">
                            <span className="new badge"  data-badge-caption="Total"> {this.state.blog_categories}  </span>  
                            <div className="card-content white-text" style={{height: "9rem"}}>
                              <span className="card-title"> Categories </span>
                              <p>Blog Categories that have been Created</p>
                            </div>
                            <div className="card-action">
                              <Link to="/admin_blogcat"> Visit
                              </Link> 
                            </div>
                          </div>
                        </div>
                        {/* end col */}

                      </div>
                      {/* end row */}

                      </div>
                      {/* end blogs */}

                </div>
              </div>
              {/* end row */}
          </div>


      </>
    );
  }
}

export default Dashboard
