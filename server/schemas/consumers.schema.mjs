import mongoose, { model, mongo } from "mongoose";
const ConsumerSchema= mongoose.Schema({
    name:{type:String, required:true},
    AFM:{type:String, required:true},
    pricebuy:{type:Number, required:true},
    createdfrom:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Employee"
    }
})

var Consumer= mongoose.model('Consumer',ConsumerSchema)

export default Consumer