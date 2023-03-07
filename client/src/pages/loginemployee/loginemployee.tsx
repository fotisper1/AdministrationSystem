import { response } from "express";
import { link } from "fs";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import './loginemployee.css'
const linkStyle = {
    color: 'white',
    padding:'10px',
  };
const LoginEmployee=()=>{
    const navigate = useNavigate();
    const [name1, setName1] = useState("")
    const [currentpassword1, setPassword1] = useState("")
    const [message, setMessage1] = useState("")
    let Loginsubmit=async (e:any)=>{
        e.preventDefault()
        await fetch('http://localhost:3000/auth-employee/login',{
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({name:name1, password:currentpassword1})
        }).then(res=>res.json())
        .then((data)=>{
            if(data.success){
                localStorage.setItem('name',data.name)
                localStorage.setItem('id',data.id)
                localStorage.setItem('accessToken',data.accessToken)
                localStorage.setItem('refreshToken',data.refreshToken)
                localStorage.setItem('userAuthenticated',('true'))
                navigate(`/employee/${data.id}`)
            }
            else{
                setMessage1(data.message)
            }
            setName1("")
            setPassword1("")


        })
        
    }
    return(
        <>
        <div className="formlogin">
        <form onSubmit={Loginsubmit}>
            <h1>Login employee</h1>
            <label htmlFor="name1">Username</label><br></br>
            <input type="text" name="name1"  required onChange={(e) => setName1(e.target.value)} value={name1}></input><br></br>
            <label htmlFor="currentpassword1">Password</label><br></br>
            <input type="password" name="currentpassword1" required onChange={(e) => setPassword1(e.target.value)} value={currentpassword1}></input><br></br>
            <button type="submit">Login</button>
        </form>
        <h5><Link to={`/register`} style={linkStyle}>If you are a new employee, register now</Link></h5>
        </div>
        <div className="message"><h2>{message}</h2></div>
        </>
    )
}
export default LoginEmployee