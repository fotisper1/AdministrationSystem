import mongoose, { model, mongo } from "mongoose";
const Hoursofemployeeschema=mongoose.Schema({
    workinghours:{type:Number, required:true,max:12,min:4},
    userhours:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Employee"
    },
},
{timestamps:true}
)

var Hoursofemployee=mongoose.model('Hoursofemployee',Hoursofemployeeschema)
export default Hoursofemployee