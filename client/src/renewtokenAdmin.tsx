import axios from "axios";
const axiosInstance = axios.create();

axios.interceptors.response.use(
    (response)=>{
        console.log('aelara sagapo')
        return response;
    },
    (error)=>{
        const originalRequest= error.config;
        console.log('to lathos vrethike')
        if((error.response.status==401 || error.response.status==403) && !originalRequest._retry){
            originalRequest._retry=true
        }
        const _refreshtoken= localStorage.getItem('refreshΤoken')
        if(_refreshtoken){
            fetch(`http://localhost:3000/auth-admin/renew/${localStorage.getItem('id')}`,{
                method:'POST',
                headers:{"Content-Type": "application/json", 
                "Authorization": "Bearer "+localStorage.getItem('accessToken'),
                body:JSON.stringify({token:_refreshtoken})}
            }).then(res=>res.json())
            .then(data=>{
                axios.defaults.headers.common['Authorization']=`Bearer ${localStorage.getItem('accessToken')}`

                localStorage.setItem('accessToken',(data.accessToken))
                localStorage.setItem('refreshToken',(data.refreshToken))
            })
            
            
            return axiosInstance(originalRequest)
        }
        return Promise.reject(error)
    }
)