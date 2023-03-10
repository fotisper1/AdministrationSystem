import mongoose, { model, mongo } from "mongoose";
const RefreshTokenschema= mongoose.Schema({
    token:{type:String,required:true},
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Employee',
        required:true}
})


var RefreshTokenEmployee = mongoose.model('refreshtokensemployee',RefreshTokenschema)

export default RefreshTokenEmployee