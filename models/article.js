import mongoose from 'mongoose'

const ArticleSchema = mongoose.Schema({
    author:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    content: { type: String, required: true },
    fans: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, { versionKey: false })

export default mongoose.model('Article', ArticleSchema)