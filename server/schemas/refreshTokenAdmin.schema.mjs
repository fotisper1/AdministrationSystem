import mongoose, { model, mongo } from "mongoose";
const RefreshTokenschema= mongoose.Schema({
    token:{type:String,required:true},
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Admin',
        required:true}
})


var RefreshTokenAdmin = mongoose.model('refreshtokensadmin',RefreshTokenschema)

export default RefreshTokenAdmin