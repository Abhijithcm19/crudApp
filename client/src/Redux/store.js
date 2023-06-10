import {configureStore} from '@reduxjs/toolkit'
import  StoreAndRemoveToken  from './token/token'


export default configureStore({
    reducer:{
   token:StoreAndRemoveToken
    }
})  