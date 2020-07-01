import React, { useState, useEffect } from 'react'

// dependencies
import Moment from 'react-moment';
import M from 'materialize-css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// import helpers
import { URL, fetchData, postData } from '../../../../Helpers/config'


// styles
import styles from '../dashboard.module.css'

export default function OrderView(props) {

    const id = props.match.params.id


    // states
    const [nilorder, setNilorder] = useState([])
    const [nilorderdocs, setNilorderdocs] = useState([])




    // onload fetch docs and order data
    useEffect(()=>{

        M.AutoInit();

        let url_orders = `${URL}/api/get_nil_order/${id}`
        let url_orders_docs = `${URL}/api/order_docs/${id}`


        fetchData(url_orders).then(data=>{
            (data.code === -1) ? alert("Fatal Error while fetching data") : setNilorder(data.msg)
        })

        fetchData(url_orders_docs).then(data=>{
            (data.code === -1) ? alert("Fatal Error while fetching data") : setNilorderdocs(data.msg)
        })
    },[])



    // mark order as complete
    const orderComplete = (check=0) => {

        if(nilorder.archived === 1 && check === 1){
            toast.info(" Order Already Marked as Complete")
        }else{

            let url = `${URL}/api/order_complete/${id}`
            let data = {}

            if(check === 1){
                data = {
                    archived: 1,
                    nil: 'A'
                }

            }else{
                let nil = (nilorder.user_id === 0) ? 'Y' : 'N';
                data = {
                    archived: 0,
                    nil
                }
            }
            postData(url, data)
                .then(data => {
                    
                    if(data.code === -1) {
                        toast.error("Fatal Error while fetching data") 
                    }else {
                        toast.success("Order Marked  as Complete")
                        setTimeout(() => {
                            window.location.reload()
                        }, 200);
                    }
                })
                .catch(err => {
                    toast.error("Unable to Mark Order as Complete")
                })
        }

    }

    
     // render nilOrdersDocs
     const renderNilordersDocs = () => {
        let template = null

        if(nilorderdocs.length === 0){
            template = <tr>
                            <td colspan={5} className="center"> No Document available </td>
                       </tr>
        }else{

            template = nilorderdocs.map((item, i) => (
    
                    <tr key={i}>
                        <td>{item.name}</td>
                        <td> {item.extension} </td>
                        <td> {(item.status === 1) ? <b>Active</b> : <b>Inactive</b>} </td>
                        <td> 
                            <Moment fromNow>
                                {item.created_at} 
                            </Moment>
                        </td>
                        <td> 
                            <a href={`${URL}/api/download_doc/${item.id}`} 
                                target="blank"
                                className="btn waves-effect waves-light green">
                                Download
                            </a>
                            
                        </td>
                    </tr>
            ))
        }
        

        return template
    }


    // render page
    if (nilorder.formats === undefined) {
        return <h3>rendering</h3>
    }else{
        
        return (
            <div>

                <div className={styles.orderViewHeader}>
                    <ToastContainer />

                    <h4> Order <b>{nilorder.order_number}</b> Details </h4>
                    {/* <div className="divider"></div>  */}

                </div>



                <div className = {styles.orderViewDetails}>

                    <h5>Status: New</h5>
                    <div className="divider"></div>
                    <div className="card material-table">

                        <p> <b>Title: </b> {nilorder.title} </p>
                        <p> <b>Category: </b> {nilorder.cats.name} </p>
                        <p> <b>Format: </b> {nilorder.formats.name} </p>
                        <p> <b>Language: </b> {nilorder.lang.name} </p>
                        <p> <b>Pages: </b> {nilorder.pages} </p>
                        <p> <b>Word count: </b> {nilorder.word_count} </p>
                        <p> <b>Notes: </b> {nilorder.notes} </p>
                        <p> <b>Created At: </b> <Moment>{nilorder.updated_at}</Moment> </p>

                    </div>

                </div>


                <div className = {styles.orderViewDocs}>

                    <h5>Documents</h5>
                    <div className="divider"></div>
                    <div className="card material-table">

                        <table className="highlight">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Extension</th>
                                <th>status</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                            </thead> 

                            <tbody>
                            

                                {renderNilordersDocs()}


                            </tbody>
                        </table>
                    </div>

                </div>

                <div className = {styles.orderViewDocs}>
                    <h5>Actions</h5>
                    <div className="divider"></div>
                    <div className="card material-table">

                        <button className="btn waves-effect waves-light green"
                                onClick ={ () => orderComplete(1)}>
                                Mark As Complete
                        </button>

                        <button className="btn waves-effect waves-light lightgreen"
                                onClick ={ () => orderComplete(-1)}>
                                Mark As inComplete
                        </button>

                    </div>
                </div>
            </div>
        )
    }
}
