import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    size: { type: String, required: true, enum:["L"] },
    ingredients: { type: [String], required: true }
});




export const Pizza = mongoose.model('Pizza', pizzaSchema);
