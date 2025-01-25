import express , { Request , Response} from "express";
import UserModel from "../models/user";
const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


router.get('/', async(req:Request , res:Response)=>{

    try{
        const newUser =  new UserModel({
            firstName: "Rajib",
            lastName: "miah",
            email:"email@gmail.com",
            password: "123456",
    
        })
    
        await newUser.save();
        res.json({message: "user router"});

    }catch(err){
        console.log("Something went wrong", err);
    }
})


router.post("/register", async (req: Request, res: Response):Promise<any> => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS as unknown as number);

        const newUser = await new UserModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        }).save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        res.status(201).json({ message: "User created successfully", token });

    } catch (err) {
        console.error("Something went wrong", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/login", async(req:Request , res:Response): Promise<any> =>{
    try{
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const existingUser = await UserModel.findOne({email});

        if(!existingUser){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password , existingUser.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id: existingUser._id} , process.env.JWT_SECRET as string , {expiresIn: "1h"});

        res.status(200).json({message: "Login successful", token});
    }
});

export default router;