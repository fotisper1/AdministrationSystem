import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from 'bcrypt'
import AccessToken from "../schemas/accessTokenAdmin.schema.mjs"
import RefreshToken from "../schemas/refreshTokenAdmin.schema.mjs"
import Admin from "../schemas/admin.schema.mjs"
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
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
    const refreshToken = jwt.sign(data,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'10m'})

    await AccessToken.create({token:accessToken,user:userid})
    await RefreshToken.create({token:accessToken,user:userid})

    return [accessToken,refreshToken];
}

export const renewAuthentication = async (req,res,next)=>{
  //take the refresh token from the user
  const refreshToken = req.body.token;
  console.log(refreshToken)
  const adminId=req.params.id
  const refreshTokenFromDB =  await RefreshToken.findOne({_id:adminId,token:refreshToken})
  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokenFromDB) {
    return res.status(403).json("Refresh token does not exist!");
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if(err){
      res.status(401).json({
        error:"refresh token is not valid"
      })
      return;
    }
    const newTokens = createTokens(data.name,userId);
    res.status(200).json({
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
    });
  });
}
export const Logout= async (req,res)=>{
  try{
      return res.status(200).json({message:'You have successfully logged out',success:true,accessToken:'',refreshToken:''})
  }
  catch(err){
      return res.status(500).json({message:err.message})
  }
}