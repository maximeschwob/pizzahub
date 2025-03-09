import { User } from '../models/users.js';
import { serverResponse } from '../utils/serverResponse.js';

export const getAllUsersController = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return serverResponse(res, 204, 'No users found');
        }

        serverResponse(res, 200, users);
    } catch (error) {
        console.error('Error getting users:', error);
        serverResponse(res, 500, 'There was an error getting the users');
    }
};

export const getSingleUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const trimmedId = id.trim(); // Trim the ID to remove any extraneous whitespace characters

        const user = await User.findById(trimmedId);

        if (!user) {
            return serverResponse(res, 404, 'User not found');
        }

        serverResponse(res, 200, user);
    } catch (error) {
        console.error('Error fetching user:', error);

        if (error.kind === 'ObjectId') {
            return serverResponse(res, 400, 'Invalid user ID');
        }

        serverResponse(res, 500, 'There was an error fetching the user');
    }
};






export const updateUserController = async (req, res) => {
    try {
        
        const allowedKeysToUpdate = ['password', 'email'];
        const keysToUpdate = Object.keys(req.body);

      
        const isValidOperation = keysToUpdate.every((update) =>
            allowedKeysToUpdate.includes(update)
        );

        if (!isValidOperation) {
            return res.status(400).send({ message: 'Invalid updates' });
        }

    
        const { id } = req.params;

    
        const updatedUser = await User.findByIdAndUpdate(
            id,                          
            { ...req.body },              
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        
        res.status(200).send(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

export const deleteUserController = async (req, res) => {
    try {
       
        const { id } = req.params;
        const trimmedId = id.trim();

      
        const deletedUser = await User.findByIdAndDelete(trimmedId);

        if (!deletedUser) {
            
            return res.status(404).send('User not found');
        }

      
        res.status(200).send({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal server error');
    }
};


 
        
      

