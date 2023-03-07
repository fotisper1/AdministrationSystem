import mongoose, { model, mongo } from "mongoose";
const AccessTokenschema= mongoose.Schema({
    token:{type:String,required:true},
    user:{type:String,required:true}
})


var AccessToken = mongoose.model('accesstokensadmin',AccessTokenschema)


export default AccessToken