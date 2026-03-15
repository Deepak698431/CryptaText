import mongoose from "mongoose";
type ConnectionObject = {
    isConnected?: number
}
const connection : ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("MongoDB is already connected")
        return
    }
    try{
        if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined");
        }
        const db = await mongoose.connect(process.env.MONGODB_URI) 
        connection.isConnected = db.connections[0].readyState
        console.log("DB is connected successfully") 
    } catch(error){
        console.log("Database connnection failed" , error)
        process.exit(1)
    }
}
export default dbConnect; 