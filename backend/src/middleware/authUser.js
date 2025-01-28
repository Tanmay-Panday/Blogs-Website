import jwt from "jsonwebtoken";
const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    res.status(400).json({ message: "Invalid user" });
  }
  try {
    const token_Decode = jwt.verify(token, process.env.JWT_SECRET);

    req.body.email = token_Decode.email;
    next();
  } catch (error) {
    console.log(error);
    
    res.status(400).json({ message: "error in decoding the token " });
  }
};

export default authUser;
