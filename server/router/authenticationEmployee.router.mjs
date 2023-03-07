import {login,renewAuthentication,Logout} from "../controllers/authenticationEmployee.controller.mjs"
import express from "express";

const authenticationEmployeeRouter = express.Router()

authenticationEmployeeRouter.post('/login',login)

authenticationEmployeeRouter.post('/renew',renewAuthentication)

authenticationEmployeeRouter.post('/renew',renewAuthentication) 

export default authenticationEmployeeRouter
