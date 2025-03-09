import bcrypt from 'bcryptjs';
import { User } from '../models/users.js'; // Assurez-vous que ce modèle est correctement défini
import { isStrongPassword } from '../utils/validators.js';
import { serverResponse } from '../utils/serverResponse.js';
import { setAuthCookie } from '../utils/auth.js'; // Vous devez avoir cette fonction définie pour gérer les cookies JWT

// Contrôleur de connexion
export const loginController = async (req, res) => {
    try {
        if (!req.body) {
            return serverResponse(res, 400, 'Please provide email and password');
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return serverResponse(res, 400, 'Either email or password is missing and they are required!');
        }

        // Recherche de l'utilisateur par email
        const relevantUser = await User.findOne({ email });
        if (!relevantUser) {
            return serverResponse(res, 404, 'User not found');
        }

        // Vérification du mot de passe
        const isPasswordMatch = bcrypt.compareSync(password, relevantUser.password);
        if (!isPasswordMatch) {
            return serverResponse(res, 400, 'Password is incorrect!');
        }

        // Génération du token JWT et envoi dans le cookie
        const cookieToken = setAuthCookie(relevantUser);
        res.cookie('auth', cookieToken, { httpOnly: true, secure: true, sameSite: 'none' });

        serverResponse(res, 200, relevantUser);
    } catch (error) {
        console.error('Error logging in:', error);
        serverResponse(res, 500, 'There was an error logging in');
    }
};

// Contrôleur d'enregistrement
export const registerController = async (req, res) => {
    try {
        if (!req.body) {
            return serverResponse(res, 400, 'Please provide relevant credentials to register');
        }

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return serverResponse(res, 400, 'All fields (username, email, password) are required');
        }

        // Validation du mot de passe
        const isValidPassword = isStrongPassword(password);
        if (!isValidPassword.isValid) {
            return serverResponse(res, 400, isValidPassword.errorMessage);
        }

        // Vérifier si l'email ou le nom d'utilisateur existe déjà
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return serverResponse(res, 400, 'User with this email or username already exists');
        }

        // Hachage du mot de passe
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Création du nouvel utilisateur
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Enregistrement de l'utilisateur dans la base de données
        await newUser.save();

        // Génération du token JWT et envoi dans le cookie
        const cookieToken = setAuthCookie(newUser);
        res.cookie('auth', cookieToken, { httpOnly: true, secure: true, sameSite: 'none' });

        serverResponse(res, 201, newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        serverResponse(res, 500, 'There was an error registering the user');
    }
};
