import mongoose from "mongoose"

export async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/pizza')
        console.log('Connected to MongoDB...')
    } catch (error) {
        console.error('Could not connect to MongoDB...', error)
    }

}
