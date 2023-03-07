import { Outlet, Navigate } from 'react-router-dom'
import {useEffect} from 'react'
import { useState } from 'react'

const auth = () => {

    let isUserAuthenticated=localStorage.getItem('userAuthenticated')
    if(isUserAuthenticated=='true'){
        return <Outlet />

    }
    else{

        return <Navigate to="/"/>
    }


}
export default auth

    