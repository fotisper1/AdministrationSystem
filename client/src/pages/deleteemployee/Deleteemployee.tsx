import { useParams } from "react-router-dom"
import { useState } from "react"
import './deleteemployee.css'
import { handleResponseAdmin } from "../../renewtokenAdmin"
const Deleteemployee=()=>{
    const [success,setSuccess]=useState("")
    const {employeeid}=useParams()
    const deleteonclick=async ()=>{
        await fetch(`http://localhost:3000/admin/delete/${employeeid}`,{
            method:'GET',
            headers:{"Content-Type": "application/json", 
            "Authorization": "Bearer "+localStorage.getItem('accessToken')}
        })
        .then(handleResponseAdmin)
        .then(res=>res.json())
        .then((data)=>{
            setSuccess(data.success)
        }
        )
    }
    if(!success){
        return(
            <>
            <button id="deleteemployee" onClick={deleteonclick}>Delete</button>
            </>
        )
    }
}
export default Deleteemployee