import mongoose, { model, mongo } from "mongoose";
const Keyschema= mongoose.Schema({
    secretkey:{type:String, default:'sjfsufsje8240njdjvwe930'}
})
var Key= mongoose.model('key',Keyschema)
export default Key