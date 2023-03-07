import { Link } from "react-router-dom"
import React from 'react'
export const Registersuccessfully=()=>{
    return(
        <>
        <div className="registersuccesfully">
            <h3>You have successfully registered, now you can log in</h3>
            <button><Link to="/login/employee">Login</Link></button>
        </div>
        </>
    )
}