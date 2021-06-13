import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { Schema, model } from 'mongoose';

// const Schema = mongoose.Schema;

interface IUser extends mongoose.Document {
	email: string;
	lastname: string;
	firstname: string;
	password: string;
	isValidPassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// generate salt for password
UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);

        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

export const UserModel = model<IUser>('user', UserSchema);
