import express from "express";
import { Logout } from "../controllers/authenticationEmployee.controller.mjs";
import {addWorkHours,addEmployee,findConsumers,addConsumer,sumProfit} from '../controllers/employee.controller.mjs'
import { authorizationRequest } from "../middlewares/authentication-middleware.mjs";
import { addConsumerValidation,addWorkHoursValidation } from "../middlewares/validation-midddleware.mjs";

const employeeRouter= express.Router()

employeeRouter.get('/:employeeid',authorizationRequest,findConsumers)

employeeRouter.post('/addhours/:employeeid',authorizationRequest,addWorkHoursValidation,addWorkHours)

employeeRouter.post('/addconsumer',authorizationRequest,addConsumerValidation,addConsumer,sumProfit) 


employeeRouter.post('/register',addEmployee) 

employeeRouter.get('/logout',authorizationRequest,Logout)

export default employeeRouter

