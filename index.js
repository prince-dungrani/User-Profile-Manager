const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
});

const User = mongoose.model('User ', userSchema);

const insertUser  = async (userData) => {
    const user = new User(userData);
    try {
        const savedUser  = await user.save();
        console.log('User  saved:', savedUser );
    } catch (error) {
        console.error('Error saving user:', error);
    }
};

const fetchUsers = async () => {
    try {
        const users = await User.find();
        console.log('All users:', users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

const main = async () => {
    await connectDB();

    await insertUser ({ name: 'Jay', email: 'jay@gmail.com', age: 18 });

    await fetchUsers();

    mongoose.connection.close();
};

main();