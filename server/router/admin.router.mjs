import { Addsalary,Viewemployee,Findemployees,Searchadmin,Increasesalary,Fireemployee } from "../controllers/admin.controller.mjs"
import {authorizationRequest} from "../middlewares/authentication-middleware.mjs"
import { Logout } from "../controllers/authenticationAdmin.controller.mjs";
import express from "express";
import { addSalaryValidation } from "../middlewares/validation-midddleware.mjs";

const adminRouter= express.Router()

adminRouter.patch('/increase/:employeeid',authorizationRequest,Increasesalary)

adminRouter.get('/viewemployee/:employeeid',authorizationRequest,Viewemployee)//thelei douleia

adminRouter.get('/employees',authorizationRequest,Findemployees)

adminRouter.post('/addsalary/:employeeid',authorizationRequest,addSalaryValidation,Addsalary)

adminRouter.get('/search/:employeename',Searchadmin)

adminRouter.delete('/delete/:employeeid',Fireemployee)

adminRouter.get('/logout',Logout)

export default adminRouter

