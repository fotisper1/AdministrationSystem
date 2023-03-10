import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import './employees.css';
import { handleResponseAdmin } from "../../utils/renewtokenAdmin";
interface IEmployee{
    _id:string;
    name:string;
    surname:string;
    password:string;
    countercons:number;
    sumprofit:number;
    Hours:number;
    salary:number;
}
interface IEmployeeData{
    employee:IEmployee[];
}
const linkStyle = {
    textDecoration: "none",
    color: 'white'
  };
const linkaddStyle = {
    color: 'white'
  };

const Employees= ()=>{
    const [employeesdata,setEmployees]= useState<any>([])
    const [message,setMessage]=useState("")
    const [salary,setSalary]=useState<any>()
    const fetchData=async ()=>{
        await fetch('http://localhost:3000/admin/employees',{
            method:'GET',
            headers:{"Content-Type": "application/json", 
          "Authorization": "Bearer "+localStorage.getItem('accessToken')}
        })
        .then(handleResponseAdmin)
        .then(res=>res.json())
        .then((data)=>{
            if(data.success){
                setEmployees(data.employees)
            }
            else{
                setMessage(data.message)
            }
        })
    }
    const search= async(e:any)=>{
        let employeename=e.target.value
        await fetch(`http://localhost:3000/admin/search/${employeename}`,{
            method:'GET',
            headers:{"Content-Type": "application/json", 
          "Authorization": "Bearer "+localStorage.getItem('token')}
        })
        .then(res=>res.json())
        .then((data:any)=>{
            if(data.success){
                setEmployees(data.employees)
            }
        })
    }
    
    useEffect(() => {
        fetchData()
      }, [])
    return (
        <>
        <div className="employees">
          <div className="search"><input type="text" placeholder="Search employee with his name" onChange={search}></input></div>  
          <div className="employeesnav">
            <table>
            <thead>
            <tr id="basic" key={'basic'}>
                <th id="name">Employee name </th>
                <th id="surname">Surname </th>
                <th id="consumers">Counter consumers </th>
                <th id="profit">Sum profit </th>
                <th id="salary">Salary </th>
                <th id="acvg-hours">Hours worked </th> 
            </tr>
            </thead>
            </table>
            <div className="employees-array">{employeesdata.map((employee:any)=>{
                return(
                <tr key={employee._id}>
                    <td id="name"><Link to={`/admin/viewemployee/${employee?._id}`} style={linkStyle}>{employee.name}</Link></td>
                    <td id="surname">{employee.surname}</td>
                    <td id="consumers">{employee.countercons}</td>
                    <td id="profit">{employee.sumprofit}</td>   
                    <td id="salary">{employee.salary?employee.salary:<Link to={`/admin/addsalary/${employee._id}`} style={linkaddStyle}>Add salary</Link>}</td>
                    <td id="hours">{  avghours(employee.Hours,employee.days)}</td>
                </tr>
            )}
            )}</div>
            <div className="employees-message">{message}</div>
          </div>
          </div>
        </>
    )
}
function avghours(props1:any,props2:any){
    const hours=props1/props2
    if(!isNaN(hours)){

        return(
            <>
            {  hours.toFixed(2)}
            </>
        )
    }
    else{
        return(
            <>
              -
            </>
        )
    }
}
export default Employees