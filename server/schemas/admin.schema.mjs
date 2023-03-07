import mongoose, { model, mongo } from "mongoose";
const AdminSchema= mongoose.Schema({
    name:{type:String, required:true},
    password:{type:String, required:true},
    profit:{type:Number, default:0}},
    {timestamps:true}
    )
var Admin= mongoose.model('Admin',AdminSchema)
export default Admin