import { Schema, model, Document } from 'mongoose';

interface ITodo extends Document {
	idUser: string;
	title: string;
	check: number;
}

const TodoSchema = new Schema<ITodo>({
    idUser: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    check: {
        type: Number,
        required: true
    }
});

export const TodoModel = model<ITodo>('todo', TodoSchema);
