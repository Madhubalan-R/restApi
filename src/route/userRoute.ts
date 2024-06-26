import { Router } from "express";
import {createUser, getUsers, updateUser, deleteUser, getUserById} from "../controller/userController";

const router = Router();

router.post('/register',createUser)
router.get("/allUsers",getUsers);
router.get('/userId/:id',getUserById)
router.put('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);


export { router as userRoutes };

