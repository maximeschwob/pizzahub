
import {Pizza} from '../models/pizzas.js';
import { serverResponse } from '../utils/serverResponse.js';



export const getAllPizzasController = async (req, res) => {
    try {
        const pizzas = await Pizza.find();

        if (pizzas.length === 0) {
            return serverResponse(res, 204, 'No pizzas found');
        }

        serverResponse(res, 200, pizzas);
    } catch (error) {
        console.error('Error getting pizzas:', error);
        serverResponse(res, 500, 'There was an error getting the pizzas');
    }
};



export const getSinglePizzaController = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérification si l'ID est fourni
        if (!id) {
            return serverResponse(res, 400, 'Please provide an ID');
        }

        // Trouver une pizza par son ID (conversion en ObjectId si nécessaire)
        const singlePizza = await Pizza.findOne({ _id: id });

        // Vérification si la pizza existe
        if (!singlePizza) {
            return serverResponse(res, 404, 'No such pizza. Try again with a different ID');
        }

        // Répondre avec les détails de la pizza
        serverResponse(res, 200, singlePizza);
    } catch (error) {
        console.error('Error getting single pizza:', error);

        // Gérer les erreurs spécifiques de Mongoose
        if (error.kind === 'ObjectId') {
            return serverResponse(res, 400, 'Invalid pizza ID');
        }

        serverResponse(res, 500, 'There was an error getting the pizza');
    }
};


export const addPizzaController = async (req, res) => {
    try {
        const { name, size, ingredients, price, description, imageUrl } = req.body;

        // Vérification des données reçues
        

        // Création d'une nouvelle pizza avec Mongoose
        const newPizza = new Pizza({
            name,
            size,
            ingredients,
            price,
            description,
            imageUrl
        });

        // Sauvegarde dans la base de données
        const savedPizza = await newPizza.save();
        const pizzaObject = savedPizza.toObject();
        delete pizzaObject.__v;
        // Répondre avec la pizza ajoutée
        serverResponse(res, 201, pizzaObject);
    } catch (error) {
        console.error("Error adding pizza:", error);
        serverResponse(res, 500, "There was an error adding the pizza.");
    }
};

// Utilisation de fs en version synchrone

// Liste d'ingrédients disponibles




//TODO : check update and check delete pizzas


export const updatePizzaController = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifier si l'ID est fourni
        if (!id) {
            return serverResponse(res, 400, 'Please provide a valid pizza ID');
        }

        // Validation des données fournies dans la requête
        if (!req.body || Object.keys(req.body).length === 0) {
            return serverResponse(res, 400, 'Please provide valid data to update');
        }

        // Mise à jour de la pizza
        const updatedPizza = await Pizza.findByIdAndUpdate(
            id,                 // Recherche par ID
            { $set: req.body }, // Mise à jour des champs spécifiés
            { new: true }       // Retourner la pizza mise à jour
        );

        // Si la pizza avec l'ID donné n'existe pas
        if (!updatedPizza) {
            console.error(`Pizza with ID ${id} not found`);
            return serverResponse(res, 404, 'Pizza not found');
        }

        // Réponse avec la pizza mise à jour
        serverResponse(res, 200, updatedPizza);
    } catch (error) {
        console.error('Error updating pizza:', error);
        serverResponse(res, 500, 'There was an error updating the pizza');
    }
};

export const deletePizzaController = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifier si l'ID est fourni
        if (!id) {
            return serverResponse(res, 400, 'Please provide a valid pizza ID');
        }

        // Supprimer la pizza par son ID
        const deletionResult = await Pizza.findByIdAndDelete(id);

        // Vérifier si une pizza a été supprimée
        if (!deletionResult) {
            console.error(`Pizza with ID ${id} not found`);
            return serverResponse(res, 404, 'Pizza not found');
        }

        // Réponse de succès
        serverResponse(res, 200, 'Pizza deleted successfully');
    } catch (error) {
        console.error('Error deleting pizza:', error);
        serverResponse(res, 500, 'There was an error deleting the pizza');
    }
};
