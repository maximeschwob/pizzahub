import jwt from 'jsonwebtoken';


export const setAuthCookie = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    const payload = {
        id: user._id,
        username: user.username,
        role: user.role
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};


