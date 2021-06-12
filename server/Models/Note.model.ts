import { Schema, model, Document } from 'mongoose';

interface INote extends Document {
	idUser: string;
	title: string;
	content: string;
}

const NoteSchema = new Schema<INote>({
    idUser: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    }
});

const NoteModel = model<INote>('note', NoteSchema);

module.exports = NoteModel;
