import mongoose, { model, mongo } from "mongoose";
const AccessTokenschema= mongoose.Schema({
    token:{type:String,required:true},
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Employee',
        required:true}
})


var AccessTokenEmployee = mongoose.model('accesstokensemployee',AccessTokenschema)


export default AccessTokenEmployee