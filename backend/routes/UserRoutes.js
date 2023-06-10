import express from 'express'

const router = express.Router()
import { upload } from '../multer/multer.js'


import {Signup,LoginUser,uploadImage} from '../controller/UserController.js'

upload.single('userImage')
router.post('/login',LoginUser)

router.post('/signup',Signup)

router.post('/addProfile/:id',upload.single('image'),uploadImage)



export default router