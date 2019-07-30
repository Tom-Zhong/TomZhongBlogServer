import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: { type: String, required: true },
    pwd: { type: String, required: true },
    role: { type: Number, default: 0 },
    age: Number
}, { versionKey: false })

export default mongoose.model('User', UserSchema)