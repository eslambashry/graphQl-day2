import {userModel} from '../../Models/user.js'
import bcrypt from 'bcryptjs'
import jwt  from 'jsonwebtoken';

export const userMutaion={
  async register(_,args){
    
        const newUser = await userModel.create(args.user)
        return newUser
    },

  async login(_,args){

    const {email,password} = args.user

    let isUserExsist = await userModel.findOne({email:email}) 


    if(!isUserExsist){
      throw new Error('Please SignUp First 🔐')  
    }

    let passMatch = await bcrypt.compare(password, isUserExsist.password)

    if(!passMatch){
      throw new Error('Wrong Password 😵')
    }

    let token =  jwt.sign({
      data:{id:isUserExsist._id,role:isUserExsist.role},
    },
     process.env.TOKEN_SECRET,{expiresIn:'1h'}
    
  )

  let refreshToken = jwt.sign({
    data:{id:isUserExsist._id,role:isUserExsist.role},
  },
   process.env.REFRESH_TOKEN_SECRET,{expiresIn:'6h'});
   
  isUserExsist.refreshToken = refreshToken;
    await isUserExsist.save();

    return {message:"Login successfully 💯",
      token,
      refreshToken
    }

  }
 }