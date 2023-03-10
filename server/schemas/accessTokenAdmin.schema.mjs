import mongoose, { model, mongo } from "mongoose";
const AccessTokenschema= mongoose.Schema({
    token:{type:String,required:true},
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Admin',
        required:true
    }
})


var AccessTokenAdmin = mongoose.model('accesstokensadmin',AccessTokenschema)


export default AccessTokenAdmin