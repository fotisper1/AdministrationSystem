import { link } from "fs";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './consumers.css'
import { handleResponseEmployee } from "../../renewtokenEmployee";
const linkStyle = {
    textDecoration: "none",
    color: 'white',
    border: "1px solid white",
    padding:"8px",
  };
const Consumers=(props:any)=>{

    const [consumersdata,setData]=useState<any>([]);
    const {employeeid}=useParams();
    const [message,setMessage]=useState("")
    const fetchData= async()=>{

        await fetch(`http://localhost:3000/employee/${employeeid}`,{
          method:'GET',
          headers:{"Content-Type": "apptdcation/json", 
          "Authorization": "Bearer "+localStorage.getItem('accessToken')}
        })
        .then(handleResponseEmployee)
        .then(res=>res.json())
        .then((data:any)=>{
            if(data.success){
                setData(data.consumerss)
            }
            else{
                setMessage(data.message)
            }
        })
    }
    useEffect(() => {
        fetchData()
      }, []) 
    return(
        <>
        <div className="consumers">
        <div className="consumersnav">
        <h6>Consumers of {localStorage.getItem('name')}</h6>
        <h5><Link to={`/employee/addconsumer/${employeeid}`} style={linkStyle}>Add new consumer</Link></h5>
        <h4><Link to={`/employee/addhours/${employeeid}`} style={linkStyle}>Add today hours</Link></h4>
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
        <div className="consumers-array">{consumersdata.map((consumer:any)=>{
            return(
                <table>
                    <thead>
                        <tr key={consumer._id}>
                            <td>{  consumer.name}</td>
                            <td>{  consumer.AFM}</td>
                            <td>{  consumer.pricebuy}</td>
                        </tr>
                    </thead>
                </table>
            )
        })}</div><br></br>
        </div>
        <div className="consumers-message">{message}</div>
        </>
    )
}
export default Consumers