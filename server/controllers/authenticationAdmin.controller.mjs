import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from 'bcrypt'
import AccessTokenAdmin from '../schemas/accessTokenAdmin.schema.mjs'
import RefreshTokenAdmin from "../schemas/refreshTokenAdmin.schema.mjs"
import Admin from "../schemas/admin.schema.mjs"
import { where } from "sequelize"
dotenv.config()

export const login = async (req,res)=>{
  const username= req.body.onoma
  const userpassword= req.body.password
  try{
      if(!username || !userpassword){
         return res.status(401).json({message:'Λείπει το όνομα ή ο κωδικός του χρήστη', success:false})
      }
      let user= await Admin.findOne({name:username})
      if(user==null){
          res.status(404).json({message:'Δεν υπάρχει χρήστης με αυτό το όνομα',success:false})
          return true
      }
      else{
          const match = await bcrypt.compare(userpassword, user.password)
          if(!match){
            res.status(401).json({message:'lathos kodikos prosvasis',success:false})
            return true
          }

          const [accessToken,refreshToken]= await createTokens(username,user._id)

          res.status(200).json({
            name:username,
            message:'syndethikes',
            success:true, 
            accessToken:accessToken,
            refreshToken:refreshToken,
            id: user._id
          })
          return 
      }
  }   
  catch(err){
      res.status(500).json({message:err.message})
  }
}


export async function createTokens(username,userid){
    const data = { name: username, userId:userid}
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' })
    const refreshToken = jwt.sign(data,process.env.REFRESH_TOKEN_SECRET, {expiresIn:'20s'})

    await AccessTokenAdmin.create({token:accessToken,user:userid})
    await RefreshTokenAdmin.create({token:refreshToken,user:userid})

    return [accessToken,refreshToken];
}

export const renewAuthentication = async (req,res,next)=>{
  try{
    //take the refresh token from the user
    const refreshToken = req.body.token;
    console.log('the res token:',refreshToken)
    const adminId=req.params.id
    const refreshTokenFromDB = await RefreshTokenAdmin.find({token:refreshToken})
    console.log(refreshTokenFromDB)
  //send error if there is no token or it's invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    if (!refreshTokenFromDB){
      return res.status(403).json("Refresh token does not exist!");
    }
    //const data= await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      /*if(error){
        console.log(error.message)
        res.status(401).json({
          error:"refresh token is not valid"
        })
        return;
      }*/
    console.log(adminId)
    const admin= await Admin.findOne({_id:adminId})
    console.log(admin.name,admin._id)
    const newTokens = await createTokens(admin.name,admin._id);
    console.log(newTokens)
      res.status(200).json({accessToken: newTokens[0],refreshToken: newTokens[1]});
  }
  catch(err){
    console.log(err.message)
  }
}
export const Logout= async (req,res)=>{
  try{
      return res.status(200).json({message:'You have successfully logged out',success:true,accessToken:'',refreshToken:''})
  }
  catch(err){
      return res.status(500).json({message:err.message})
  }
}