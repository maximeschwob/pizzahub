import * as fs from 'fs/promises';
import { User } from '../models/users.js';
import { main } from '../db/mongoose.js';
import { join } from 'path';

const resetUsers = async () => {
    try {
        await main(); // Connect to MongoDB
        await User.deleteMany({}); // Delete all existing users
        const users = await fs.readFile(join(process.cwd(), 'users.json'), 'utf-8'); // Read users.json
        await User.insertMany(JSON.parse(users)); // Insert new users
        console.log("The 'users' collection has been successfully reset!");
    } catch (error) {
        console.error("Error while resetting:", error);
    }
};

resetUsers();
