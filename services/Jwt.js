import jwt from 'jsonwebtoken';

export const SignToken = (id) => {
    const token  =  jwt.sign(id,process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE}); 
    return token;
}

