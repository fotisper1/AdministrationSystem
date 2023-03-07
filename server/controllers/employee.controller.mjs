import express from "express"
import mongoose, { model } from "mongoose";
import bodyParser from "body-parser"
import bcrypt from 'bcrypt'
import Employee from "../schemas/employees.schema.mjs"
import Hoursofemployee from "../schemas/hoursEmployee.schema.mjs"
import Consumer from "../schemas/consumers.schema.mjs"

export const addConsumer = async (req,res,next)=>{
    const onoma=req.body.username
    const afm=req.body.arithmosafm
    const employeeid= req.body.employee
    const posoagoras=req.body.poso

    try{
        if( onoma || afm || employeeid || posoagoras){
            const consumer= await Consumer.create({name:onoma,AFM:afm,pricebuy:posoagoras,createdfrom:employeeid})
            if(consumer){
                res.status(201).json({consumer:consumer,message:'o pelatis kataxorithike sto systima',success:true})
                next()
            }
            else{
                res.status(400).json({message:'Den einai dynati i dimourgia neou pelati',success:false})
                return true
            }
        }
        else{
            res.status(400).json({message:'ta stoixeia einai ellipi',success:false})
            return true
        }
    }
    catch(error){
        res.status(500).json({message:error.message,success:false})
    }
}
export const addWorkHours=async (req,res)=>{
    const employeeid=req.params.employeeid
    const hours= req.body.workhours
    try{
        let employee= await Employee.updateOne({_id:employeeid},{$inc:{days:1}})
        let employee1=await Employee.updateOne({_id:employeeid},{$inc:{Hours:hours}})
        let dayhours= await Hoursofemployee.findOne({userhours:employeeid})
        if(dayhours){
            //o minas kai i mera tin teleytaia fora pou o xistis prosthese ores ergasias
            let datemonth=dayhours.updatedAt.getMonth();
            let dateday=dayhours.updatedAt.getDate();
            //o minas kai i mera auti tin stigmi
            let currentdate= new Date();
            let currentmonth= currentdate.getMonth();
            let currentday= currentdate.getDate();
            console.log(datemonth)
            if(currentmonth===datemonth && currentday===dateday){
                return res.status(400).json({message:'exoun idi kataxorithei oi ores ergasias gia simera',success:false})
            }
            else{
                const mongohours=await Hoursofemployee.findOneAndUpdate({userhours:employeeid},{workinghours:hours})
                return res.status(200).json({message:'kataxorithikan oi ores ergasias gia simera',success:true})
            }
        }
        else{
            const mongohours=await Hoursofemployee.create({userhours:employeeid,workinghours:hours})
            if(mongohours){
                return res.status(202).json({message:'kataxorithikan oi ores ergasias gia simera',success:true})
            }
            else{
                return res.status(400).json({message:'Den einai dynati i auxisi ton oron ergasias',success:false})
            }
        }
        
    }
    catch(error){
        res.status(500).json({message:error.message,success:false})
    }
}

//douleyei kanonika, yparxei problima me to key
export const addEmployee=async (req,res)=>{
    const onoma= req.body.name
    const passwordconfirm= req.body.password
    const epitheto=req.body.surname

    let employee= await Employee.findOne({$or: [{'name':onoma},{'surname':epitheto}]})
    if(employee) {
        res.status(400).json({message:'auto to onoma i to epitheto yparxei idi',success:false})
        return true;
    }
    try{
        const hash = await bcrypt.hash(passwordconfirm, 10)
        let employee= await Employee.create({name:onoma,surname:epitheto,password:hash})
        res.status(201).json({employee:employee,success:true})
    }
    catch(error){
        res.status(500).json({message:error.message,success:false})
    }
}

export const findConsumers = async (req,res)=>{
    const employeeid= req.params.employeeid
    try{
        let consumers= await Consumer.find({createdfrom:employeeid}).sort({pricebuy:'desc'})
        if(consumers!=null){
            res.status(200).json({consumerss:consumers,success:true})
        }
        else{
            res.status(404).json({success:false,message:'Den mporesan na vrethoun oi pelates tou sygkekrimenou ergazomenou'})
        }
    }
    catch(error){
        res.status(500).json({message:error.message,success:false})
    }
}
export const sumProfit = async (req,res)=>{
    const employeeid=req.body.employee
    const posoagoras=req.body.poso

    try{
        const employee= await Employee.updateOne({_id:employeeid},{$inc:{countercons:1}})
        const employee1= await Employee.updateOne({_id:employeeid},{$inc:{sumprofit:posoagoras}})
        if(employee.modifiedCount==1 && employee1.modifiedCount==1){
            console.log(employee)
            return employee
        }
        else{
            console.log('Den mporese na auxithei to kerdos tou ergazomenou')
        }
    }
    catch(error){
        throw new Error('sfalma')
    }
}
