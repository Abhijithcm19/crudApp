import User from "../models/UserSchema.js";
import validateRegisterInput from '../validatioin/register.js'
import validateLoginInput from '../validatioin/login.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const LoginUser= async(req,res)=>{

try{
const { errors, isValid } = validateLoginInput(req.body);
const {email,password}= req.body

if(!isValid) {
    return res.status(400).json(errors);
}


User.findOne({email:email}).then((user)=>{

    if(!user ){
        errors.email = 'User not found'
 
        return res.status(404).json(errors);
     
     
    }else if(user.isBlocked===true){
     errors.email = 'Your account has been blocked !'
     return res.status(404).json(errors);
    }
    bcrypt.compare(password,user.password).then((isMatch)=>{
        if(isMatch){
          
            const payload={
                id:user.id,
                name:user.name
            }

            jwt.sign(payload, process.env.JWT_SECRECT,{
                expiresIn: '3d'
            }, (err, token) => {
              
                if(err) console.error('There is some error in token', err);
                else {
                    res.json({
                        success: true,
                        id:user.id,
                        name:user.name,
                        email:user.email,
                        token: `Bearer ${token}`
                    });
                }
            })
            
        }else{
            errors.password = 'Incorrect Password';
            return res.status(400).json(errors);
        }
    })
})



}catch(err){
    console.log(err.message);

}   
}

export const Signup= async(req,res)=>{
    try{

const { errors, isValid } = validateRegisterInput(req.body);
const {name,email,password}= req.body
console.log(name,email,password);

const UserData= await User.findOne({email:email})

if(!isValid) {
    return res.status(400).json(errors);
}


if(UserData){
 return res.status(400).json({email:'Email already exists'}).console.log('userfound');;
 


}else{
    const hash = await bcrypt.hash(password, 10)
     const newUser = new User({
        name,
        email,
        password:hash
    })

     newUser.save().then(user=>{
    return res.json(user)
  })

}
    }catch(err){
        console.log(err.message);
    }

}


export const uploadImage= async(req,res)=>{
    try{
        console.log(req.params.id)
       const id =req.params.id
      await User.updateOne({_id:id},{$set:{picturePath:req.file.filename}})
    
      const userData = await User.findOne({_id:id})
       return res.json(userData) 
    
    }catch(err){
        console.log(err.message)
    }
    
    }