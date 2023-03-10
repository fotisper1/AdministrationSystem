import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from 'bcrypt'
import Employee from "../schemas/employees.schema.mjs"
import AccessTokenEmployee from "../schemas/accessTokenEmployee.schema.mjs"
import RefreshTokenEmployee from "../schemas/refreshTokenAdmin.schema.mjs"
dotenv.config()

export const login = async (req,res)=>{
  const username= req.body.name
  const userpassword= req.body.password

  try{
      if(!username || !userpassword){
          res.status(400).json({message:'Λείπει το όνομα ή ο κωδικός του χρήστη', success:false})
      }
      let user= await Employee.findOne({name:username})
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

          const [accessToken,refreshToken] = await createTokens(username,user._id)
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
      res.status(500).json({error:err.message})
  }
}


export async function createTokens(username,userid){
    const data = { name: username, userId:userid}
    console.log('mydata:',data)

    const accessToken = jwt.sign(data,process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' })
    const refreshToken = jwt.sign(data,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'20s'})

    await AccessTokenEmployee.create({token:accessToken,user:userid})
    await RefreshTokenEmployee.create({token:refreshToken,user:userid})

    return [accessToken,refreshToken];
}

export const renewAuthentication = async (req,res,next)=>{
  
  //take the refresh token from the user
  const refreshToken = req.body.token;
  console.log(refreshToken)
  const employeeid=req.params.id
  
  const refreshTokenFromDB =  await RefreshTokenEmployee.find({token:refreshToken})
  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokenFromDB) {
    return res.status(403).json("Refresh token does not exist!");
  }
  /*jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if(err){
      res.status(401).json({
        error:"refresh token is not valid"
      })
      return;
    }*/
    const employee= await Employee.findOne({_id:employeeid})
    const newTokens = await createTokens(employee.name,employeeid);
    res.status(200).json({
      accessToken: newTokens[0],
      refreshToken: newTokens[1],
    });
  
}
export const Logout= async (req,res)=>{
  try{
      res.status(200).json({message:'You have successfully logged out',success:true,accessToken:'',refreshToken:''})
  }
  catch(err){
      res.status(400).json({message:err.message})
  }
}

