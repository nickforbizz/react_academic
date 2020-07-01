import React, { useState, useEffect } from 'react'


// dependencies
import M from 'materialize-css';
import MUIDataTable from "mui-datatables";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// import helpers
import { URL, fetchData } from '../../../../Helpers/config'

// styles
import styles from '../dashboard.module.css'
import { Link } from 'react-router-dom';

export default function AdminBlogs() {

    
    const [blogs, setBlogs] = useState([])


    // call seerver data
    useEffect(() => {

        M.AutoInit();

        let url_blogs = `${URL}/api/blogs?archived=0`

        fetchData(url_blogs).then(data=>{
            
            (data.code === -1) ? alert("Fatal Error while fetching data") : setBlogs(data.msg)
            console.log(data)
            alert()
        })
        

    },[])

    const delRecord = (id) => {
        let url = `${URL}/api/del_blog/${id}`

        console.log(id)

        let confirmation = window.confirm("Are you sure you want to delete the record")

        console.log( url);
        if (confirmation) {
            
            fetchData(url)
                .then(data => {
                    if(data.code === -1) {
                        toast.error(data.msg.msg) 
                    }else {
                        toast.success(data.msg.msg)
                        setTimeout(() => {
                            window.location.reload()
                        }, 3000);
                    }
                })
                .catch(err => console.error(err))
        }else{
        }

    } 


    // render blogs
    const blogs_columns = [
        {
            name: "id",
            label: "#",
            options: {
             filter: true,
             sort: true,
            }
        },
        {
            name: "title",
            label: "Title",
            options: {
             filter: true,
             sort: true,
            }
        },
        {
            name: "created_at",
            label: "Created At",
            options: {
             filter: true,
             sort: true,
            }
        },        
        {
        name: 'Action',
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: (dataIndex, rowData) => {
                console.log(rowData.rowData[0])
                return (
                    <div>
                        <Link style={{marginLeft: '10px'}}
                            to={`/admin_view_blog/${rowData.rowData[0]}`} 
                            className="btn waves-effect waves-light green">
                                    view
                        </Link> 

                        <button className="btn waves-effect waves-light red"
                                onClick={() => delRecord(rowData.rowData[0])}
                            >
                            Del
                        </button>

                    </div>
                );
            }
            },
        }
      ];



    const blogs_options = {
        textLabels: {
            body: {
              noMatch: "Sorry, no matching records found",
              toolTip: "Sort",
              columnHeaderTooltip: column => `Sort for ${column.label}`
            },
            pagination: {
              next: "Next Page",
              previous: "Previous Page",
              rowsPerPage: "Rows per page:",
              displayRows: "of",
            },
            toolbar: {
              search: "Search",
              downloadCsv: "Download CSV",
              print: "Print",
              viewColumns: "View Columns",
              filterTable: "Filter Table",
            },
            filter: {
              all: "All",
              title: "FILTERS",
              reset: "RESET",
            },
            viewColumns: {
              title: "Show Columns",
              titleAria: "Show/Hide Table Columns",
            }
          },
          selectableRows: false
      };


    const blogs_data = blogs


    if(blogs.length < 1){
        return (<>
                    <ToastContainer />
                    <h4 className="card material-table">No data available </h4>
                </>)
    }else{

        return (
            <React.Fragment>
                <div className="Xcontainer">
                 
    
                    <ToastContainer />
                    <h3 className={styles.h3m20}> Blogs</h3>
    
                    <div id="admin" className="col s12">
                        <div className="card material-table">
                            

    
                            <MUIDataTable
                                title={"Blogs Table"}
                                data={blogs_data}
                                columns={blogs_columns}
                                options={blogs_options}
                            />
                        
                        </div>
                    </div>
    
    
                </div>
            </React.Fragment>
        )
    }

}
