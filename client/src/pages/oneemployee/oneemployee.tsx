import { link } from "fs";
import { useState,useEffect } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import './oneemployee.css'
import { handleResponseAdmin } from "../../renewtokenAdmin";
interface IEmployee{
    name:string;
    surname:string;
    password:string;
    countercons:number;
    sumprofit:number;
    Hours:number;
    salary:number;
    _id:string
}
interface IEmployeeData{
    employee:IEmployee;
}
const linkStyle = {
    textDecoration: "none",
    color: 'white'
};
const Oneemployee=(props:any)=>{
    const navigate=useNavigate();
    const {employeeid} = useParams();
    const [empdata,setdata]=useState<any>("");
    const [consumersdata,setCons]=useState<any>([])
    const [message,setMessage]=useState<any>("")
    const [success,setSuccess]=useState<any>("")
    const fetchData=()=>{
        fetch(`http://localhost:3000/admin/viewemployee/${employeeid}`,{
            method:'GET',
            headers:{"Content-Type": "appthcation/json",
            "Authorization": "Bearer "+localStorage.getItem('accessToken')}
        })
        .then(handleResponseAdmin)
        .then(res=>res.json())
        .then((data)=>{
            if(data.success){
                setdata(data.employee)
                setCons(data.consumers)
            }
            else{
                setMessage(data.message)
            }
        })
    }
    const deleteonclick=async ()=>{
        await fetch(`http://localhost:3000/admin/delete/${employeeid}`,{
            method:'DELETE',
            headers:{"Content-Type": "application/json", 
            "Authorization": "Bearer "+localStorage.getItem('accessToken')}
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data.success){
                navigate(`/admin/employees`)
            }
        }
        )
    }
    const increaseclick=async ()=>{
        await fetch(`http://localhost:3000/admin/increase/${employeeid}`,{
            method:'PATCH',
            headers:{"Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem('accessToken')}
        })
        .then((data:any)=>{
            if(data.success){
                navigate(`/admin/viewemployee/${employeeid}`)
            }
            else{
                //
            }
        })
    }
    useEffect(() => {
        fetchData()
      }, [])
    return(
        <>
        <div className="emp">
            <div className="delete"><button onClick={deleteonclick}>Fire employee</button></div><br></br>
            <div className="increase"><button onClick={increaseclick}>Increase salary</button></div>
            <h4>Consumers of {empdata.name} and sales</h4>
            <div className="consumersofemployeenav">
                <table>
                    <thead>
                        <tr>
                            <th>Consumer name</th>
                            <th>AFM number</th>
                            <th>Price buy</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="consumersofemployee">
            <table>
                <thead>{consumersdata.map((consumer:any)=>{
                    return (
                        <tr>
                            <td>{consumer.name}</td>
                            <td>{consumer.AFM}</td>
                            <td>{consumer.pricebuy}</td>
                        </tr>
                        )
            
                    })}
        </thead>
        </table>
        </div>
        <div className="oneemployee-message">{message}</div>
        </div>
        </>
    )
}
export default Oneemployee