import jwt from 'jsonwebtoken'; // Import JWT for token generation

//autentifikacija doktora middleware
const authDoctor = async (req, res, next) => {

  try {
    const { dtoken } = req.headers;
    if (!dtoken) {

      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET); 


    req.body = req.body || {};
    req.body.docId = token_decode.id;
    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};
export default authDoctor;
