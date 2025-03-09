import * as fs from 'fs/promises'
import { Pizza } from '../models/pizzas.js';
import { main } from '../db/mongoose.js';
import { join } from 'path';

const resetPizzas = async () => {
    await main();
    await Pizza.deleteMany({});
    const pizzas = await fs.readFile(join(process.cwd(), 'pizzas.json'), 'utf-8');
    await Pizza.insertMany(JSON.parse(pizzas));
}

resetPizzas()