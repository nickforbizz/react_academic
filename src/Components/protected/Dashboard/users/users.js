import React, { useState, useEffect, useRef } from 'react'
import { useForm } from "react-hook-form";


// dependencies
import { Modal } from 'antd';
import M from 'materialize-css';
import MUIDataTable from "mui-datatables";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// import helpers
import { URL, fetchData, postData } from '../../../../Helpers/config'
import appauth from '../../../../appauth';

// styles
import styles from '../dashboard.module.css'

export default function Users(props) {




    // set states
    const [users, setUsers] = useState([])
    
    const [mvisible, setMvisible] = useState(false)
    const [modAction, setModAction] = useState("")
    const [modHeader, setModHmodHeader] = useState("Nyenjeri Users")


    // set inputs
    const [names, setNames] = useState('')
    const [email, setEmail] = useState('')
    const [userURL, setUserURL] = useState('')
    const [rowid, setRowid] = useState('')




    // call seerver data
    useEffect(() => {

        M.AutoInit();

        let url_users = `${URL}/api/create_users?_token=${appauth.apptoken}`
        let data = {
            "_token": appauth.apptoken
        }


        fetchData(url_users, {data}).then(data=>{
            (data.code === -1) ? toast.error("Fatal Error while fetching data") : setUsers(data.msg)
        })


    },[])



        // submit data
        const { register, handleSubmit, errors, watch } = useForm();
        const password = useRef({});
        password.current = watch("password", "");


        const onSubmit = data => {
    
            let url =''
            if(data.url === 'C') {
                url = `${URL}/api/create_users`
            }else{
                url = `${URL + data.url}` 
            } 

            console.log(data, url);
            
    
    
            postData(url, data)
                .then(data => {
                    console.log(data);
                    if(data.code === -1) {
                        toast.error(data.msg.msg) 
                    }else {
                        toast.success(data.msg.msg)
                        setTimeout(() => {
                            window.location.reload()
                        }, 3000);
                    }
                    setMvisible(false)
                })
                .catch(err => console.error(err))
    
        }
    
        const delRecord = (id) => {
            let url = `${URL}/api/del_user/${rowid}`
    
            let confirmation = window.confirm("Are you sure you want to delete the record")
    
            if (confirmation) {
                
                fetchData(url)
                    .then(data => {
                        console.log(data);
                        if(data.code === -1) {
                            toast.error(data.msg.msg) 
                        }else {
                            toast.success(data.msg.msg)
                            setTimeout(() => {
                                window.location.reload()
                            }, 3000);
                        }
                        setMvisible(false)
                    })
                    .catch(err => console.error(err))
            }else{
                setMvisible(false)
            }
    
        } 
    
        // edit order
        const editOrderLang = (id) => {
            // call server for data
            if (id === -1) {
    
                setNames('')
                setEmail('')
                setUserURL(`C`)
                setModHmodHeader("Add User")
                
            }else{
    
                fetchData(`${URL}/api/get_user/${id}`)
                .then(data => {
                    console.log(data);
                    
                    if(data.code === -1) {
                        toast.error("Unable to fetch data")
                    }else{
                        let dat = data.msg
                        
                        setNames(dat.names)
                        setEmail(dat.email)
                        setRowid(dat.id)
    
                    }
                    setUserURL(`/api/update_user/${id}`)
                })
                .catch(
                    error => console.error(error)
                )
                
                setModHmodHeader("Edit User")
                
            }
            setModAction('edit_order')
            setMvisible(true)
        }
    
        // render modal
        const renderMdata = (action = "") => {
            let template = null
    
            if (action === 'edit_order') {
                template = (
                    <div>
                        <div className="row">
                            <form className="col s12" onSubmit={handleSubmit(onSubmit)}>
    
    
    
                                <input name="url" defaultValue={userURL} ref={register()} type="hidden"/>
                                <input type="hidden" defaultValue={appauth.user_id} name="user_id" ref={register()}/>
                                <input type="hidden" defaultValue='1' name="status" ref={register()}/>
                                <input type="hidden" defaultValue={appauth.apptoken} name="_token" ref={register()}/>
    
    
                                <div className="row">
    
    
                                    <div className="default-field col s12">
    
                                        <label htmlFor="title">Names</label>
                                        <input id="title" 
                                                defaultValue={names} 
                                                name="names" type="text" 
                                                ref={register({ required: true })}
                                                onChange = {(e) => setNames(e.target.value)} />
                                        {errors.names && <span className="red_message">This field is required</span>}
    
                                    </div>
    
                                    <div className="default-field col s12">
    
                                        <label htmlFor="notes"> Email </label>  
                                        <input id="email" 
                                                defaultValue={email}
                                                className="validate" 
                                                name="email"
                                                ref={register({ 
                                                    required: true,
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                        message: "invalid email address"
                                                      }
                                                 })}
                                                onChange = {(e) => setEmail(e.target.value)} 
                                                />
                                        {errors.email && <span className="red_message">{errors.email.message}</span>}
                                        
                                    </div>
    
                                    {
                                        (userURL !== 'C') ?
                                            <div className="col s12">
                                                <label htmlFor="archive">Archive</label>
                                                <select id="archive" className="browser-default" name="archive" ref={register()}>
                                                    <option value="" disabled defaultValue>Choose your option</option>
                                                    <option value="0">No</option>
                                                    <option value="1">Yes</option>
                                                    
                                                </select>
                                                {errors.archive && <span className="red_message">This field is required</span>}
                                            </div>
                                        : 
                                        <div>

                                            <div className="default-field col s12">
        
                                                <label htmlFor="notes"> Password </label>  
                                                <input id="password" 
                                                        name="password"
                                                        type="password"
                                                        autoComplete="new-password"
                                                        ref={
                                                            register({
                                                            required: "You must specify a password",
                                                            minLength: {
                                                              value: 6,
                                                              message: "Password must have at least 6 characters"
                                                            }
                                                          })
                                                        }
                                                        />
                                                {errors.password && <span className="red_message">{errors.password.message}</span>}
                                                
                                            </div>

                                            <div className="default-field col s12">
        
                                                <label htmlFor="notes"> Confirm Password </label>  
                                                <input
                                                    name="password_repeat"
                                                    type="password"
                                                    ref={register({
                                                    validate: value =>
                                                        value === password.current || "The passwords do not match"
                                                    })}
                                                />
                                                {errors.password_repeat && <span className="red_message">{errors.password_repeat.message}</span>}
                                                
                                            </div>

                                        </div>
    
                                    }
    
                                    <div className="col s6" style={{marginTop: '2rem'}}>
                                        <input style={{marginRight: "30px"}} id="submit_format" 
                                                className="waves-effect waves-light btn" 
                                                name="update"  
                                                type="submit"/>  
                                        
    
    
                                    </div>
    
    
                                </div>
                            </form>
                            <div className="row">
                                <div className="right-align row_del">
                                        {
                                            (userURL !== 'C') ?                                            
    
                                                <button onClick ={(rowid) => delRecord(rowid)} className="waves-effect waves-light btn red ">Delete </button>  
                                            : ''
                                        }
    
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }else{
                template= (<div>Processing ...</div>)
            }
            return template
        }



    const user_columns = [
        {
            name: "id",
            label: "#",
            options: {
             filter: true,
             sort: true,
            }
        },
        {
            name: "names",
            label: "Names",
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
                return (
                    
                    <button className="btn waves-effect waves-light green" 
                            onClick={() => editOrderLang(rowData.rowData[0])}>
                        Edit
                    </button>
                );
            }
            },
        }
      ];

    const user_options = {
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





    return (
        <React.Fragment>
                <div className="Xcontainer">
                 
                    <ToastContainer />
                    <Modal
                        title={modHeader}
                        visible={mvisible}
                        onOk={()=>setMvisible(false)}
                        onCancel={()=>setMvisible(false)}
                        >

                            <div>
                                { renderMdata(modAction) }
                            </div>

                    </Modal>
    
                    <h3 className={styles.h3m20}> Users</h3>
    
                    <div id="admin" className="col s12">
                        <div className="card material-table">

                            <a href="#" className="btn waves-effect waves-light green" 
                                    style= {{marginBottom: '8px'}}
                                    onClick={() => editOrderLang(-1)}>
                                Add
                            </a>
                            
                   
    
                            <MUIDataTable
                                title={" List of Users"}
                                data={users}
                                columns={user_columns}
                                options={user_options}
                            />
                        
                        </div>
                    </div>
    
    
                </div>
            </React.Fragment>
    )
}
