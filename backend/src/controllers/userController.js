import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (email, id) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET);
};

//@description to create credentials of user having name, email-id,password
//@type POST request
//@route /api/user/add-user
export const createUser = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    // to check if either username or user password or user email are not present
    return res
      .status(400)
      .json({ message: "Invalid user credentials / Credentials incomplete" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const userData = {
    name,
    password: hashPassword,
    email,
    admin: false, // these are not admins
  };
  try {
    const isEmailUsed = await userModel.findOne({ email: email }); // check if email-id is not already in use
    if (isEmailUsed) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const userCredentials = userModel(userData);
    await userCredentials.save(); // upload user credentials in mongodb user collection
    res.status(200).json({ message: "User data uploaded successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error in uploading user credentials in mongodb database",
    });
  }
};

//@description to create credentials of admin having name, email-id,password
//@type POST request
//@route /api/user/add-admin
export const createAdmin = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    // to check if either username or user password or user email are not present
    return res
      .status(400)
      .json({ message: "Invalid user credentials / Credentials incomplete" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const userData = {
    name,
    password: hashPassword,
    email,
    admin: true,
  };
  try {
    const isEmailUsed = await userModel.findOne({ email: email }); // check if email-id is not already in use
    if (isEmailUsed) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const userCredentials = userModel(userData);
    await userCredentials.save(); // upload user credentials in mongodb user collection
    res.status(200).json({ message: "Admin data uploaded successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error in uploading user credentials in mongodb database",
    });
  }
};

//@description do sign-in
//@type POST request
//@route /api/user/sign-in
export const signIn = async (req, res) => {
  // request emai
  const { email, password } = req.body;
  if (!email || !password) {
    // missing fields
    return res
      .status(400)
      .json({ message: "Invalid Credentials / Empty Fields" });
  }

  // now find the user credentials in users database in mongodb
  try {
    const isUserExist = await userModel.findOne({
      email,
    });
    if (!isUserExist) {
      // email or password is incorrect
      return res.status(400).json({ message: `Incorrect email` });
    }
    const passwordMatch = await bcrypt.compare(password, isUserExist.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    // credentials verified till here
    const token = createToken(isUserExist.email, isUserExist.id);

    res.status(200).json({
      message: `Sign-in Successful`,
      email: isUserExist.email,
      admin: isUserExist.admin,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ message: "user not found in the database" });
  }
};

//@description to get credentials(name, admin status) of a user by his email-id
//@type POST request
//@route /api/user/get-user-by-email
export const getOneUserCredentialsByEmail = async (req, res) => {
  // get email from req body
  const { email } = req.body;
  // now find the user credentials name, admin status
  try {
    const userData = await userModel.findOne({ email }); // find data of user by email-id
    if (!userData) {
      // no user is found
      return res.status(400).json({
        message: `User with email-id ${email} does not exist in mongodb database`,
      });
    }

    const credentials = {
      name: userData.name,
      admin: userData.admin,
    };

    res.status(200).json({
      message: "user credentials fetched successfully from database",
      credentials,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "error in fetching user credentials from database" });
  }
};

//@description to get number of users
//@type GET request
//@route /api/user/get-number-of-users
export const getNumberOfUsers = async (req, res) => {
  try {
    const numberOfUsers = await userModel.countDocuments({ admin: false });
    const numberOfAdmins = await userModel.countDocuments({ admin: true });
    if (!numberOfUsers || !numberOfAdmins) {
      res
        .status(400)
        .json({ message: "error in counting documents from mongodb database" });
    }
    res.status(200).json({
      message: "number of users successfully fetched",
      users: numberOfUsers,
      admins: numberOfAdmins,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error in getting number of users" });
  }
};
