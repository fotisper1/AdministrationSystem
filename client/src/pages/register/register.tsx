import { application } from "express";
import { useState } from "react";
import { Registersuccessfully } from "./registersuccess";
import './register.css'
const Register=()=>{
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordconfirm, setPasswordConfirm] = useState("");
    const [surname, setSurname] = useState("");
    const [message,setMessage]=useState("")
    const [success,setSuccess]=useState("")
    let Submitreg= async (e:any)=>{
        e.preventDefault();
        fetch('http://localhost:3000/employee/register',{
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({name:name, password:password,passwordconfirm:passwordconfirm,surname:surname})
        })
        .then(res=>res.json())
        .then((data:any)=>{
            setMessage("")
            setSuccess(data.success)
            if(!data.success){
                setMessage(data.message)
            }
        })
    
    }
    return(
        <>
        <div className="register">
            <form onSubmit={Submitreg}><br></br>
            <h1>Register employee</h1>
            <label htmlFor="name">Username</label><br></br>
            <input type="text" name="name"  required onChange={(e) => setName(e.target.value)} ></input><br></br>
            <label htmlFor="password">Password</label><br></br>
            <input type="password" name="password"  required onChange={(e) => setPassword(e.target.value)} ></input><br></br>
            <label htmlFor="passwordconfirm">Password Confirm</label> <br></br>
            <input type="password" name="passwordconfirm"  required onChange={(e)=>setPasswordConfirm(e.target.value)}></input><br></br>
            <label htmlFor="surname">Surname</label><br></br>
            <input type="text" name="surname" required onChange={(e)=>setSurname(e.target.value)}></input><br></br>
            <button type="submit">Register</button>
            </form>
        </div> 
        {success && <Registersuccessfully />}
        <h3>{message}</h3>
        </>
    )
}
export default Register