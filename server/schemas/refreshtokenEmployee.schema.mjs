import mongoose, { model, mongo } from "mongoose";
const RefreshTokenschema= mongoose.Schema({
    token:{type:String,required:true},
    user:{type:String,required:true}
})


var RefreshToken = mongoose.model('refreshtokensemployee',RefreshTokenschema)

export default RefreshToken