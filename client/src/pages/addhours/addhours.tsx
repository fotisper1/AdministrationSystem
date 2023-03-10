import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './addhours.css'
import { handleResponseEmployee } from "../../utils/renewtokenEmployee";
const Addhours=()=>{
    const navigate= useNavigate()
    const [hours,setHours]=useState("")
    const {employeeid}= useParams()
    const [message,setMessage]=useState("")
    let Submithours=async (e:any)=>{
        e.preventDefault()
        await fetch(`http://localhost:3000/employee/addhours/${employeeid}`,{
            method:'POST',
            headers: {"Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem('accessToken')},
            body:JSON.stringify({workhours:hours})
        })
        .then(handleResponseEmployee)
        .then(res=>res.json())
        .then((data:any)=>{
            if(data.success){
                navigate(`/employee/${employeeid}`)
            }
            else{
                setMessage(data.message)
            }
        })
    }

    return(
        <>
        <div className="formhours">
            <form onSubmit={Submithours}>
                <label htmlFor="hours">Hours worked today:</label><br></br>
                <input type="number" name="hours" onChange={(e) => setHours(e.target.value)}></input><br></br>
                <button type="submit">Add hours</button>
            </form>
        </div>
        <div className="hours-message"><h2>{message}</h2></div>
        </>
    )
}
export default Addhours