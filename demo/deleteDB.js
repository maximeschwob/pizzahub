import { Pizza } from "../models/pizzas.js";
import { main } from "../db/mongoose.js"
import { Order } from "../models/order.js";
import { User } from "../models/users.js";

const delDB = async () => {
    await main();

    Pizza.deleteMany({})
    Order.deleteMany({})
    User.deleteMany({})
}

delDB()