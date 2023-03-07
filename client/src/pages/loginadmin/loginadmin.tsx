import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isNumberObject } from "util/types";
import './loginadmin.css'
const LoginAdmin=()=>{
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate=useNavigate()
    let Submitadmin=async (e:any)=>{
        e.preventDefault();
            await fetch('http://localhost:3000/auth-admin/login',{
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({onoma:name, password:password})
            })
            .then(res=>res.json())
            .then((data)=>{
                if(data.success){
                    localStorage.setItem('name',(data.name))
                    localStorage.setItem('accessToken',(data.accessToken))
                    localStorage.setItem('refreshToken',(data.refreshToken))
                    localStorage.setItem('id',(data.id))
                    localStorage.setItem('userAuthenticated',('true'))
                    navigate('/admin/employees')
                }
                else{
                    setMessage(data.message)
                }
                setName("")
                setPassword("")
            })

        }
    
        
    
    return(
        <>
        <form className="loginadmin" onSubmit={Submitadmin}>
            <h1>Login admin</h1><br></br>
            <label htmlFor="name">Username</label><br></br>
            <input type="text" name="name" required onChange={(e) => setName(e.target.value)} value={name}></input><br></br>
            <label htmlFor="password">Password</label><br></br>
            <input type="text" name="password" required onChange={(e) => setPassword(e.target.value)} value={password}></input><br></br>
            <button type="submit">Σύνδεση</button>
        </form>

        <div className="message"><h2>{message}</h2></div>
    </>
    )
}
export default LoginAdmin