
import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'

import { addPizzaController, deletePizzaController, getAllPizzasController, getSinglePizzaController, updatePizzaController } from './controllers/pizzas.js';
import { deleteUserController, getAllUsersController, getSingleUserController, updateUserController} from './controllers/users.js';
import { getAllOrdersController,addOrderController } from './controllers/order.js';
import { loginController, registerController } from './controllers/auth.js';
import { main } from './db/mongoose.js';






const app = express()
app.use(express.json());
app.use(cors())

app.get('/pizzas', getAllPizzasController)
app.get('/pizza/:id', getSinglePizzaController)
app.post('/pizza', addPizzaController)
app.put('/updatePizza/:id', updatePizzaController)
app.delete('/deletePizza/:id', deletePizzaController)


app.get('/Orders', getAllOrdersController)
app.post('/newOrder', addOrderController)


 app.get('/getAllUsers', getAllUsersController)
app.get('/getSingleUser/:id', getSingleUserController)
 app.put('/updateUser/:id', updateUserController)
 app.delete('/deleteUser/:id', deleteUserController)
 
app.post('/register', registerController)
 app.post('/login', loginController)


app.listen(3000, async () => {
    await main()
    console.log('Server is running on port 3000...')
})

dotenv.config();  // Charge les variables d'environnement
