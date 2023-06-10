import { createSlice } from "@reduxjs/toolkit";




export const StoreAndRemoveToken =createSlice({
name:"token",
initialState:{
id:'',
name:"",
email:"",
token:""

},
    reducers:{

        storetoken:(state,action)=>{
            const { email, id, name, token } = action.payload;
            console.log(email,id,name,token);
            state.id=id;
            state.name=name;
            state.token=token;
            state.email=email
        },
        removetoken:(state,action)=>{
         state.token=""
         state.id=""
         state.name=""
         state.email=""
        }
        
    } 
    
     
})
console.log("this is token",StoreAndRemoveToken);

export const {storetoken,removetoken}=StoreAndRemoveToken.actions;
export default StoreAndRemoveToken.reducer