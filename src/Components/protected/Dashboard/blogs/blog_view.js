import React, { Component } from 'react'

// dependencies
import { Editor } from '@tinymce/tinymce-react';




import M from 'materialize-css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

// import helpers
import { URL, fetchData, postData, tinymceKey } from '../../../../Helpers/config'
import appauth from '../../../../appauth'


// styles
import styles from '../dashboard.module.css'

export default class blog_view extends Component {

    state ={
        editor: '',
        post_body: '',
        featured_image: '',
        blog_category_id: '',
        post_cats: [],
        post: []

    }

    post_id = this.props.match.params.id



    handleEditorChange  = (content, editor) => {

        let post_body = content 
        
        this.setState({
            editor,
            post_body
        });
      };

    componentDidMount() {
        M.AutoInit();


        let url_post_cats = `${URL}/api/blog_category?_token=${appauth.apptoken}`
        let url_post = `${URL}/api/get_blog/${this.post_id}?_token=${appauth.apptoken}`
        let data = {
            "_token": appauth.apptoken
        }


        fetchData(url_post_cats, {data}).then(data=>{
            (data.code === -1) ? toast.error("Fatal Error while fetching data") : this.setState({ post_cats: data.msg })
        })

        fetchData(url_post, {data}).then(data=>{
            if(data.code === -1){
                toast.error("Fatal Error while fetching data")
            }else{

                (data.msg.code === -1) ? toast.error(data.msg.msg) : this.setState({ post: data.msg.msg })
                
            }
            

            if (this.state.post !==null && this.state.post !==undefined) {

                this.setState({ 
                    post_body: this.state.post
                })
            } else {
                this.setState({ post_body: '' });
            }
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
    
        let url = `${URL}/api/update_blog/${this.post_id}`
        let formdata = new FormData(window.document.querySelector("#post_form"));
        formdata.append('body', this.state.post_body)
        formdata.append('user_id', appauth.user_id)
        
        let post_title = (formdata.get('title'));
        let  formFields = document.getElementById('post_form').elements;
        let post_img = (formFields['featured_image'].files.length > 0);
        
        if (post_img === false) {
            toast.error("Please provide an Image in the form field ")
        } else if(post_title === ''){
            toast.error("Please provide a title in the form field ")
        } else {
            
            
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
                        <h4 className={styles.blog_view}>View Post</h4>
    
    
                        <form  encType="multipart/form-data" id="post_form" onSubmit = { (e) => this.submitData(e) }>

                            <input type="hidden" defaultValue={appauth.user_id} name="user_id" />
                            <input type="hidden" defaultValue={appauth.apptoken} name="_token" />
    
                            <div className="input-field col s12">
                                <p >Title</p>
                                <input id="title" 
                                        defaultValue={this.state.post.title}
                                        name="title" 
                                        type="text" 
                                        className="validate" 
                                />
                            </div>
    
                            <div className="col s12">
                                <label htmlFor="category">Category</label>
                                <select id="category"  className="browser-default" name="blog_category_id">
                                    <option value="" disabled defaultValue={this.state.post.cats.id}>Choose your option</option>
                                    { this.displayPostCats() }
                                </select>
                            </div>
    
                            <div className="input-field col s12">
                                <p>Body</p>
                                <Editor
                                    apiKey = {tinymceKey}
                                    initialValue = {this.state.post.body}
                                    init={{
                                        plugins: 'autoresize advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
                                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code media',
                                        placeholder: "Write something here"
                                    }}
                                    onEditorChange={this.handleEditorChange}
                                />
                                
                            </div>
                            <div className="input-field col s12">
    
                                <p> Featured Image </p>
                                <input type="file" id="featured_image" className="browser-default" name="featured_image"  />
                                
                            </div>

                            <div className="col s12">
                                <label htmlFor="archived"> Archive </label>
                                <select id="archived"  className="browser-default" name="archived">
                                    <option value="0" >No</option>
                                    <option value="1" >Yes</option>
                                </select>
                            </div>
    
    
                            <div className="input-field col s12">
                                <input className="btn" type="submit" value="Update" />
                            </div>
    
                        </form>
                    
                    
                    </div>
    
                </div>
            )
        }
    }
}
