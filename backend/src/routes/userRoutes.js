import express from "express";
import {
  createAdmin,
  createUser,
  getOneUserCredentialsByEmail,
  signIn,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/add-user", createUser); // to create a user
userRouter.post("/add-admin", createAdmin); // to create an admin user
userRouter.post("/sign-in", signIn); //to do sign-in of user/admin
userRouter.post("/get-user-by-email", getOneUserCredentialsByEmail); // to get user credentials(name, admin-status) by his email-id

export default userRouter;
