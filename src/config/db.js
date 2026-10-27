import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 3000);
        console.log('Ket noi Database thanh cong');
    } catch (error) {
        console.error('Khong ket noi duoc voi Database');
        process.exit(1);
    }
}