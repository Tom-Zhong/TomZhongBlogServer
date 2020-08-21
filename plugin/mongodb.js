import mongoose from 'mongoose';

export default async () => {
  await mongoose.connect(
    'mongodb+srv://root:1234@cluster0-mtpng.mongodb.net/test?retryWrites=true&w=majority',
		{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );
  await mongoose.set('useCreateIndex', true);
};
