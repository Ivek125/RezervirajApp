import jwt from 'jsonwebtoken'; // Import JWT for token generation

//autentifikacija user middleware
const authUser = async (req, res, next) => {
  

  try {
    const { token } = req.headers;
    if (!token) {
        
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: token_decode.id };


    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};
export default authUser;