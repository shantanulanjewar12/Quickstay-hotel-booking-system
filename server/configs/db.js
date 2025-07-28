import mongoose from 'mongoose'

const connectDB = async ()=> {
    try {
        mongoose.connection.on('connected', ()=>
            console.log("Database successfully connected")
        );
        await mongoose.connect(`${process.env.MONGO_URI}/quick-stay`)
    } catch (error) {
        console.error(error.message)
    }
}

export default connectDB