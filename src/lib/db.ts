import mongoose from "mongoose";
const connectMongoDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("already connected");
        return;
    }
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        console.log("Connected!")
    } catch (error) {
        console.log(error);
    }
}
export default connectMongoDB;