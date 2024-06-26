import { Request, Response } from 'express';
import  {User}  from '../entities/User';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../dbconfig';

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
// Sign up a new user
export const createUser = async (req: Request, res: Response) => {
      try {
        const { name, email, password } = req.body;
        if (
          !name ||
          typeof name !== "string" ||
          !password ||
          typeof password !== "string" ||
          !email ||
          typeof email !== "string" ||
          !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
        ) {
          return res.status(400).json({ message: "invalid Email id" });
        }
        const userRepository = AppDataSource.getRepository(User);
        const hashedPassword = await bcrypt.hash(password,10);
        const user = userRepository.create({
          name,
          email,
          password: hashedPassword,
        });
        await userRepository.save(user);
        res.status(201).json({ message: "User created" });
      } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Error creating user", error });
      }
    };
//get user by id
export const getUserById = async (req: Request, res: Response) => {
      try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
          return res.status(400).json({ message: "Invalid user id" });
        }
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where:{id:userId }});
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Error fetching user", error });
      }
    };
    export const updateUser = async (req: Request, res: Response) => {
      try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
          return res.status(400).json({ message: "Invalid user id" });
        }
        const { name, email, password } = req.body;
        if (!name && typeof name !== "string") {
          return res.status(400).json({ message: "Invalid name" });
        }
        if (
          !email &&
          (typeof email !== "string" ||
            !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
        ) {
          return res.status(400).json({ message: "Invalid email id" });
        }
        if (!password && typeof password !== "string") {
          return res.status(400).json({ message: "Invalid password" });
        }
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({id:userId });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);
        await userRepository.save(user);
        return res.status(200).json({ message: "User updated successfully" });
      } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Error updating user", error });
      }
    };
// Delete user
export const deleteUser = async (req: Request, res: Response) => {
      try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
          return res.status(400).json({ message: "Invalid user id" });
        }
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({id: userId });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        await userRepository.remove(user);
        return res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Error deleting user", error });
      }
    };
    