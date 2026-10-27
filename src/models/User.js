import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Khong duoc de trong ten']
        },

        email: {
            type: String,
            trim: true,
            required: [true, 'Khong duoc de trong email'],
            unique: true,
        },

        password: {
            type: String,
            required: [true, 'Khong duoc de trong password'],
        },

        role: {
            type: String,
            enum: ['admin', 'student'],
            default: 'student'
        },
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);
export default User