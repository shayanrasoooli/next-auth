import mongoose from "mongoose";
    
export default async function ConnectedDB() {
    if (mongoose.connections[0].readyState) {
        return 
    }
    mongoose.set("strictQuery" , false)
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to dataBse');
}