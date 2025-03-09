import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Charger les variables d'environnement

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the .env file");
}

/**
 * Génère un token JWT pour un utilisateur
 * @param {Object} user - L'objet utilisateur
 * @returns {string} - Token JWT signé
 */
export const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

/**
 * Vérifie un token JWT
 * @param {string} token - Le token JWT
 * @returns {Object | null} - Payload décodé ou null si invalide
 */
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return null;
    }
};
