import { text } from "express";
import mongoose, { model, mongo } from "mongoose";
const EmployeeSchema= mongoose.Schema({
    name:{type:String, required:true},
    surname:{type:String,required:true},
    password:{type:String, required:true},
    countercons:{type:Number,default:0},
    sumprofit:{
        type:Number,
        default:0
    },
    Hours:{
        type:Number,
        default:0
    },
    days:{type:Number,default:0},
    salary:{type:Number,
         min:800,
         max:3000}
})

var Employee= mongoose.model('Employee',EmployeeSchema)
export default Employee