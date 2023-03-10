import { useState } from "react";
import { Params, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './addsalary.css'
import { handleResponseAdmin } from "../../utils/renewtokenAdmin";
const Addsalary=()=>{
    const [salary,Setsalary]=useState("")
    const [message,setMessage]=useState("")
    const {employeeid}=useParams()
    const navigate=useNavigate()
    let Submitsalary= async (e:any)=>{
        e.preventDefault()
        fetch(`http://localhost:3000/admin/addsalary/${employeeid}`,{
            method:'POST',
            headers: {"Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem('accessToken')},
            body:JSON.stringify({salary:salary})
        })
        .then(handleResponseAdmin)
        .then(res=>res.json())
        .then((data:any)=>{
            if(data.success){
              navigate(`/admin/viewemployee/${employeeid}`)
            }
            else{
              setMessage(data.message)
              console.log('data:',data.message)
            }
        })
    }

    return(
        <div className="formslr">
          <form onSubmit={Submitsalary}>
            <label htmlFor="salary">Salary employee</label><br></br>
            <input type="text" name="salary" onChange={(e) => Setsalary(e.target.value)}></input><br></br>
            <button type="submit">Add salary</button>
          </form>
          <div className="slrmessage">{message}</div>
        </div>
    )
}
export default Addsalary