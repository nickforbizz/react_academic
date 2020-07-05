

class AppAuth{

    constructor() {
        if(navigator.cookieEnabled){
            this.isAuthenticated = localStorage.getItem('isAuthenticated')
            this.apptoken = localStorage.getItem('apptoken')
            this.user_id = localStorage.getItem('user_id')
            this.user_email = localStorage.getItem('user_email')
        }else{
            alert('Please unblock cokies to continue')
            // this.deAuthenticate()
        }
    }


    isAuthenticated = false;
    apptoken = ''
    user_id = null
    user_email = null

    authenticate (props) {
        if(props.code === 1){
            this.isAuthenticated = true
            this.apptoken = props.token
            this.user_id = props.user.id
            this.user_email = props.user.email

            localStorage.setItem("isAuthenticated", this.isAuthenticated)
            localStorage.setItem("apptoken", this.apptoken)
            localStorage.setItem("user_id", this.user_id)
            localStorage.setItem("user_email", this.user_email)

        }
    }


    deAuthenticate (props) {
        this.isAuthenticated = false
        this.apptoken = null
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('apptoken')
        localStorage.removeItem('user_id')
        localStorage.removeItem('user_email')
    }
}


export default new AppAuth