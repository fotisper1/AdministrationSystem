import { login, Logout, renewAuthentication } from "../controllers/authenticationAdmin.controller.mjs"
import express from "express";

const authenicationAdminRouter = express.Router()

authenicationAdminRouter.post('/login',login)

authenicationAdminRouter.post('/renew/:id',renewAuthentication) 

export default authenicationAdminRouter