import mongoose from 'mongoose'

mongoose.connect(
	'mongodb+srv://root:1234@cluster0-mtpng.mongodb.net/test?retryWrites=true&w=majority',
	{useNewUrlParser: true}
)
mongoose.set('useCreateIndex', true)