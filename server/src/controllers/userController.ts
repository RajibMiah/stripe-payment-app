import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import { AuthenticatedRequest } from '../types/global';

export const userProfileController = async(req:AuthenticatedRequest , res:Response): Promise<any> =>{
    try{
        const id = req.user?.id;
        if(!id){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const users = await UserModel.find({_id: id});
        res.status(200).json(users);
    }catch(err){
        console.error("Something went wrong" , err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const userLoginController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await UserModel.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET as string,
            { expiresIn: '24h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Something went wrong', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const userRegisterController = async (req: Request, res: Response):Promise<any> => {
    try {
        console.log("req.body", req.body);  
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

        const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS as unknown as number || 11);

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
}