import express from "express"
import mongoose from 'mongoose'
import bodyParser from "body-parser"
import cors from "cors"
import authenticationEmployeeRouter from "./router/authenticationEmployee.router.mjs"
import employeeRouter from "./router/employee.router.mjs"
import adminRouter from "./router/admin.router.mjs"
import authenicationAdminRouter from "./router/authenticationAdmin.router.mjs"

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors({origin: '*'}));
app.use(express.static("public"));
const port=3000
mongoose.connect('mongodb://localhost/systemadmin', {useNewUrlParser:true })
app.use(express.urlencoded({ extended: false }))

//Routers
app.use('/auth-employee',authenticationEmployeeRouter)
app.use('/employee',employeeRouter)
app.use('/auth-admin',authenicationAdminRouter)
app.use('/admin',adminRouter)


app.listen(port,()=>{
    console.log('i efarmogi xekinise stin thyra'+port)
})