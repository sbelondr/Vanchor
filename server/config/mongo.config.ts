import mongoose from 'mongoose';

mongoose
    .connect(process.env.MONGO_URI ?? '', {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB connected.'))
    .catch((err) => console.log(err.message));

// callback
mongoose.connection.on('connected', () => {
    console.log('Mongoose connect to database.');
});

mongoose.connection.on('error', (err) => {
    console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.');
});

// close connection before exit
process.on('SIGINT', async() => {
    await mongoose.connection.close();
    process.exit(0);
});
