import React, { useState, useEffect } from 'react'


// dependencies
import M from 'materialize-css';
import MUIDataTable from "mui-datatables";

// import helpers
import { URL, fetchData } from '../../../../Helpers/config'

// styles
import styles from '../dashboard.module.css'
import { Link } from 'react-router-dom';

export default function NilOrders() {

    
    const [nilorders, setNilorders] = useState([])


    // call seerver data
    useEffect(() => {

        M.AutoInit();

        let url_orders = `${URL}/api/nil_order?nil=A&archived=1`

        fetchData(url_orders).then(data=>{
            
            (data.code === -1) ? alert("Fatal Error while fetching data") : setNilorders(data.msg)
            console.log(data)
        })
        

    },[])


    // render nilOrders
    const nilorder_columns = [
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
            name: "email",
            label: "Email",
            options: {
             filter: true,
             sort: true,
            }
        }, 
        {
            name: "notes",
            label: "Notes",
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
                    <Link style={{marginLeft: '10px'}}
                        to={`/view_order/${rowData.rowData[0]}`} 
                        className="btn waves-effect waves-light green">
                                view
                    </Link> 
                );
            }
            },
        }
      ];
    const nilorder_options = {
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
    const nilorders_data = nilorders


    if(nilorders.length < 1){
        return <div className="card material-table">
                    <h4> Archived Orders </h4>
                    <p> No data available</p>
                </div>
    }else{

        return (
            <React.Fragment>
                <div className="Xcontainer">
                 
    
    
                    <h3 className={styles.h3m20}> Archived Orders</h3>
    
                    <div id="admin" className="col s12">
                        <div className="card material-table">
                            
                   
    
                            <MUIDataTable
                                title={"Archived Orders Table"}
                                data={nilorders_data}
                                columns={nilorder_columns}
                                options={nilorder_options}
                            />
                        
                        </div>
                    </div>
    
    
                </div>
            </React.Fragment>
        )
    }

}
