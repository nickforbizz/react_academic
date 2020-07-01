import Axios from 'axios'


const URL = 'http://127.0.0.1:5000'

async function fetchData(url) {
    var g_data;
    await Axios.get(url)
        .then(response => {
            let data = response.data
            g_data = {
                "code": 1,
                "msg": data
            }
        })
        .catch(error => {
            console.error(error)
            g_data = {
                "code": -1,
                "msg": error
            }
        })

        return g_data
}



async function postData(url, data={}, params={}) {
    var p_data;
    await Axios.post(url, data)
        .then(response => {
            let data = response.data
            p_data = {
                "code": 1,
                "msg": data
            }
        })
        .catch(error => {
            console.error(error)
            p_data = {
                "code": -1,
                "msg": error
            }
        })

        return p_data
}

export  { 
    URL, fetchData, postData
}