


import jwt from 'jsonwebtoken'
import validateLoginInput from '../validatioin/login.js'
import User from '../models/UserSchema.js';



export const adminLoign=((req,res)=>{
    try{
    const { errors, isValid } = validateLoginInput(req.body);
    const {email,password}=req.body
    if(!isValid) {
        return res.status(400).json(errors);
    }

if(email==process.env.ADMIN_EMAIL && password==process.env.ADMIN_PASSWORD){
    const payload = {
        email: email,
    };
    jwt.sign(payload, process.env.JWT_SECRECT,{
        expiresIn: 3600
    },(err,token)=>{
        if (err) console.error("There is some error in token", err);
        else{
            res.json({
                success:true,
                email: email,
                token: `Bearer ${token}`,
            })
        }
    }
    )


}else{

    errors.password = 'Invalid Email or Password ! Please try again.';
            return res.status(400).json(errors);

 }


    }catch(error){

        console.log(error.message);
    }

    
})



export const getAllUser= (async(req,res)=>{
try {
      const getAllUser=await User.find()

res.json({
   status:true,
   AllUsers:getAllUser
})


} catch (error) {
    console.log(error.message);
}


})





export const blockUser=async(req,res)=>{
try{

const id=req.params.id
 await User.updateOne({_id:id},{$set:{isBlocked:true}})
 const isBlocked= await User.findOne({_id:id})
return res.json(isBlocked.isBlocked)

}catch(err){
    console.log(err.message);
}
}


export const unblockuser=async(req,res)=>{
    try {
        
        const id=req.params.id
        await User.updateOne({_id:id},{$set:{isBlocked:false}})
        const isUnBlocked= await User.findOne({_id:id})
       return res.json(isUnBlocked.isBlocked)
        
    } catch (error) {
 console.log(error.message);        
    }
}


export const EditUser =((req,res)=>{

 
const {name,userId}=req.body 

  
       User.findOne({_id:userId}).then((userdata)=>{
          if(userdata.name===name){
            console.log('name Aleredu exist');
            return res.status(400).json({email:'Sorry this username is already taken !'})
          }else {
            User.findOneAndUpdate({_id: userId}, {name:name})
            .then((updatedUser) => {
        
              res.json({
                status:true,
                usernameedited:updatedUser
             })

            })
            .catch((err) => {
              console.log(err);
            });
          }
       })
      
    }) 
