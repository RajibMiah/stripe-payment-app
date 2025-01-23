import express , { Request , Response} from "express";
import UserModel from "../models/user";

const router = express.Router();

router.get('/',(req:Request , res:Response)=>{

    try{
        const newUser = new UserModel({
            firstName: "Rajib",
            lastName: "miah",
            email:"email@gmail.com",
            password: "123456",
    
        })
    
        newUser.save();
        res.json({message: "user router"});

    }catch(err){
        console.log("Something went wrong", err);
    }
})

export default router;