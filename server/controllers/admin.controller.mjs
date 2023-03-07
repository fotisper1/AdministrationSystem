import Admin from "../schemas/admin.schema.mjs"
import Employee from "../schemas/employees.schema.mjs"
import Consumer from "../schemas/consumers.schema.mjs"
import Refresh from "../schemas/refreshTokenAdmin.schema.mjs"
import Stripe from "stripe"
import dotenv from "dotenv"
import OneEmployeeDTO from "../DTO/oneemployee.mjs"
import EmployeesDTO from "../DTO/employees.mjs"
dotenv.config()
export const Addsalary= async (req,res)=>{
    const employeeid= req.params.employeeid
    const slr=req.body.salary
    const employeeslr= await Employee.updateOne({_id:employeeid},{salary:slr})
    try{
        if (typeof employeeslr!== undefined){
            res.status(200).json({message:'o misthos tou ypallilou prostethike me epityxia',employee:employeeslr,success:true})
        }
        else{
            res.status(400).json({message:'i prosthiki tou misthou den itan dynati',success:false})
        }
    }
    catch(err){
        res.status(500).json({message:err.message,success:false})
    }
    
}


export const Findemployees= async (req,res)=>{
    try{
        const employees= await Employee.find()
        if(employees!=null){
            //let employees1= new EmployeesDTO(employees)
            res.status(200).json({employees:employees1, message:'ta stoixeia olon ton ergazomenon',success:true})
        }
        else{
            res.status(400).json({message:'den vrethikan ypalliloi',success:false})
        }
    }
    catch(err){
        res.status(500).json({message:err.message,success:false})
    }
}
export const Viewemployee= async(req,res)=>{
    try{
        const employeeid=req.params.employeeid
        console.log('ael'+employeeid)
        if(employeeid){
            const oneemployee=await Employee.findOne({_id:employeeid})

            if(oneemployee==null){
                
                res.status(404).json({message:'den yparxei employee me auto to id',success:false})
            }
            else{
                let result= new OneEmployeeDTO(oneemployee)
                let consumers= await Consumer.find({createdfrom:employeeid})
                res.status(200).json({employee:oneemployee,consumers:consumers,success:true})
            }
        }
        else{
            res.status(400).json({message:'den yparxei id',success:false})
        }
    }
    catch(err){
        res.status(500).json({message:err.message,success:false})
    }
}
export const Searchadmin= async(req,res)=>{
    const searchname=req.params.employeename
    try{
        const result= await Employee.find({name:{$regex:searchname,$options:'i'}})
        if(result){
            res.status(200).json({employees:result,success:true})
        }
        else{
            res.status(404).json({success:false,message:'Den vrethike ergazomenos me auto to onoma'})
        }
    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}
export const Fireemployee= async(req,res)=>{
    const employeeid= req.params.employeeid;
    try{
        const finding= await Employee.findOne({_id:employeeid})
        if(finding){
            const result = await Employee.deleteOne({_id:employeeid})
            if(result.deletedCount){
                res.status(200).json({message:'o ypallilos diagrafthike epytxos',success:true})
            }
            else{
                res.status(400).json({message:'ypirxe sfalma kata tin diagrafi toy ypallilou',success:false})
            }
        }
        else{
            res.status(400).json({message:'den yparxei sto systima o sygkekrimenos ypallilos',success:false})
        }
    }
    catch{
        res.status(500).json({message:'ypirxe sfalma kata tin diagrafi toy ypallilou',success:false})
    }
}
export const Increasesalary= async(req,res)=>{
    const employeeid= req.params.employeeid;
    try{
        if(employeeid){
            const employee=await Employee.updateOne({_id:employeeid},{$inc:{salary:100}})
            res.status(200).json({success:true})
        }
        else{
            res.status(404).json({success:false, message:'den yparxei o sygkegkrimenos ergazomenos'})
        }
    }
    catch(error){
        res.status(500).json({message:error.message,success:false})
    }
}