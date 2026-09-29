import jwt from 'jsonwebtoken';

export const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'super_secret_jwt_key_apex_college_2026_secured',
    {
      expiresIn: process.env.JWT_EXPIRE || '30d',
    }
  );
};

export default generateToken;
