import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './addconsumer.css'
import { useParams } from "react-router-dom";
import { handleResponseEmployee } from "../../utils/renewtokenEmployee";
const Addconsumer=()=>{
    const [name, setName] = useState("");
    const [afm, setAfm] = useState("");
    const [poso, setPoso] = useState("");
    const [message,setMessage]=useState("");
    const navigate=useNavigate()
    const {employeeid}=useParams()
    let Submitconsumer=async (e:any)=>{
        e.preventDefault();
            await fetch('http://localhost:3000/employee/addconsumer',{
            method:'POST',
            headers: {"Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem('accessToken')},
            body:JSON.stringify({username:name, arithmosafm:afm,employee:employeeid, poso:poso})
            })
            .then(handleResponseEmployee)
            .then(res=>res.json())
            .then((data)=>{
                if(data.success){
                    navigate(`/employee/${localStorage.getItem('id')}`)
                }
                else{
                    setMessage(data.message)
                }
            })

        }
        
        
    
    return(
        <>
        <form className="formconsumer" onSubmit={Submitconsumer}>
            <label htmlFor="name">Consumer name</label><br></br>
            <input type="text" name="name" required onChange={(e) => setName(e.target.value)} ></input><br></br>
            <label htmlFor="afm number">afm number</label><br></br>
            <input type="number" name="afm" required onChange={(e) => setAfm(e.target.value)} ></input><br></br>
            <label htmlFor="poso">Poso agoras</label><br></br>
            <input type="number" name="poso" required onChange={(e)=> setPoso(e.target.value)}></input><br></br>
            <button type="submit">Submit</button>
        </form>

        <div className="addconsumer-message"><h2>{message}</h2></div>
    </>
    )
}
export default Addconsumer