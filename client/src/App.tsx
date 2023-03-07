import React from 'react';
import {BrowserRouter,Link,Route,Routes} from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import Home from './pages/home/home'
import LoginAdmin from './pages/loginadmin/loginadmin'
import LoginEmployee from './pages/loginemployee/loginemployee'
import Addconsumer from './pages/addconsumer/Addconsumer';
import Addhours from './pages/addhours/addhours';
import Addsalary from './pages/addsalary/addsalary';
import Register from './pages/register/register'
import Consumers from './pages/consumers/consumers'
import Employees from './pages/employees/employees'
import Oneemployee from './pages/oneemployee/oneemployee';
import Logout from './pages/logout/logout'
import LogoutNav from './logoutnav';
import Auth from './hooks/PrivateRoutes';

function App() {
  return (
    <>
     
      <BrowserRouter>
        <div className="app"> 
          <LogoutNav />
          <Routes>
             <Route path='/' element={<Home/>} />
             <Route path='/login/admin' element={<LoginAdmin/>}/>
             <Route path='/login/employee' element={<LoginEmployee/>}/>
             <Route path='/register' element={<Register/>}/>
             <Route path='/logout' element={<Logout/>} />
             <Route element={<Auth/>}>
               <Route path='/employee/addconsumer/:employeeid' element={<Addconsumer/>}/>
               <Route path='/employee/:employeeid' element={<Consumers/>} />
               <Route path='/admin/employees' element={<Employees/>} />
               <Route path='/admin/viewemployee/:employeeid' element={<Oneemployee/>}/>
               <Route path='/admin/addsalary/:employeeid' element={<Addsalary/>} />
               <Route path='/employee/addhours/:employeeid' element={<Addhours/>} />
             </Route> 
          </Routes>
        </div> 
      </BrowserRouter> 
    </>
  )
}

export default App;
