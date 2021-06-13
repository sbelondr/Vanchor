import { Schema, model, Document } from 'mongoose';

interface ITimer extends Document {
	idUser: string;
	mode: string;
	pomodoro: string;
	timer: number;
}

const TimerSchema = new Schema<ITimer>({
    idUser: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    pomodoro: {
        type: String,
        required: true
    },
    timer: {
        type: Number,
        required: true
    }
});

export const TimerModel = model<ITimer>('timer', TimerSchema);
