import React, { Component } from 'react'

// dependencies
import { Editor } from 'react-draft-wysiwyg'
import {EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML  } from 'draft-js-export-html'


import M from 'materialize-css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { ToastContainer, toast } from 'react-toastify'

// import helpers
import { URL, fetchData, postData } from '../../../../Helpers/config'
import appauth from '../../../../appauth'


// styles
import styles from '../dashboard.module.css'

export default class blog_view extends Component {

    state ={
        editorState: EditorState.createEmpty(),
        post_body: '',
        featured_image: '',
        blog_category_id: '',
        post_cats: []

    }




    onEditorStateChange = (editorState) => {

        let contentState = editorState.getCurrentContent()
        let post_body = stateToHTML(contentState) 
        
        this.setState({
            editorState,
            post_body
        });
      };

    componentDidMount() {
        M.AutoInit();


        let url_post_cats = `${URL}/api/blog_category?_token=${appauth.apptoken}`
        let data = {
            "_token": appauth.apptoken
        }


        fetchData(url_post_cats, {data}).then(data=>{
            (data.code === -1) ? toast.error("Fatal Error while fetching data") : this.setState({ post_cats: data.msg })
        })


    }


    displayPostCats(){

        if(this.state.post_cats.length < 1){
            var cats = <option> -- select --</option>
        }else{

            cats = this.state.post_cats.map((item, i) =>  (
    
                <option key={i} value={item.id}>{item.title}</option>
     
            ))
        }
        return cats;

    }
      


      submitData = (e) => {
          e.preventDefault();
        
          let url = `${URL}/api/blogs`
          let formdata = new FormData(window.document.querySelector("#post_form"));
          formdata.append('body', this.state.post_body)
          formdata.append('user_id', appauth.user_id)
          


          postData(url, formdata)
            .then(data => {
                console.log(data);
                if(data.code === -1) {
                        toast.error("Fatal Error while fetching data") 
                }else {
                    (data.msg.code === -1) ? toast.error(data.msg.msg) : toast.success(data.msg.msg);
                    setTimeout(() => {
                        window.location.reload()
                    }, 200);
                }
            })
            .catch(err =>{ 
                console.error(err)
                toast.error("Fatal Error while fetching data") 
            })
          
          
      }


    render() {
        if(this.state.post.length < 1){
            return <div>
                <ToastContainer />
                <div className="card material-table">
                    <p>No data available at the moment</p>
                </div>
            </div>
        }else{
            
            return (
                <div>
                    <ToastContainer />
    
    
                    <div className="card material-table">
                        <h4>Add Post</h4>
    
    
                        <form  encType="multipart/form-data" id="post_form" onSubmit = { (e) => this.submitData(e) }>
    
                            <div className="input-field col s12">
                                <p >Title</p>
                                <input id="title" 
                                        name="title" 
                                        type="text" 
                                        className="validate" 
                                />
                            </div>
    
                            <div className="col s12">
                                <label htmlFor="category">Category</label>
                                <select id="category"  className="browser-default" name="blog_category_id">
                                    <option value="" disabled defaultValue>Choose your option</option>
                                    { this.displayPostCats() }
                                </select>
                            </div>
    
                            <div className="input-field col s12">
                                <p>Body</p>
                                <Editor
                                    editorState={this.state.editorState}
                                    spellCheck="true"
                                    placeholder="Write something here"
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                />
                            </div>
                            <div className="input-field col s12">
    
                                <p> Featured Image </p>
                                <input type="file" id="featured_image" className="browser-default" name="featured_image"  />
                                
                            </div>
    
    
                            <div className="input-field col s12">
                                <input className="btn" type="submit" />
                            </div>
    
                        </form>
                    
                    
                    </div>
    
                </div>
            )
        }
    }
}
