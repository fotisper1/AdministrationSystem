import { useEffect, useState } from "react"
import { handleResponseAdmin } from "../../utils/renewtokenAdmin"
import './logout.css'
const Logout=()=>{
    const [message,setMessage]=useState("")
    const fetchdata=async ()=>{
        await fetch('http://localhost:3000/admin/logout',{
            method:'GET',
            headers:{"Content-Type": "application/json", 
            "Authorization": "Bearer "+localStorage.getItem('accessToken')}
        })
        .then(handleResponseAdmin)
        .then(res=>res.json())
        .then((data)=>{
            setMessage(data.message)
            if(data.success){
                localStorage.clear()
            }
        })
    }
    /*function logoutresult(){
        if(success){
            return(
                <div className="message"><h2>{message}</h2></div>
            )
        }
        else{
            return (
                <div className="message"><h2>{message}</h2></div>
            )
        }
    }*/
    useEffect(() => {
        fetchdata()
      }, [])
    return(
        <>
        <div className="logout">{message}</div>
        </>
    )
}
export default Logout