import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, 'Khong duoc de trong title']
        },

        price: {
            type: Number,
            required: [true, 'Khong duoc de trong gia tien'],
            min: [0, 'Khong duoc de gia tien am'],
        },

        category: {
            type: String,
            enum: ['IT', 'Design', 'Business']
        },

        isPublished: {
            type: Boolean,
            default: true,
        },

        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'San pham phai thuoc ve truong nao do']
        },
    },
    {
        timestamps: true,
    }
)

const Course = mongoose.model('Course', courseSchema);
export default Course