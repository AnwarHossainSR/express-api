import mongoose from 'mongoose';
import { PARTICIPANTS_ROLE } from '../../constants.js';

const participantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: PARTICIPANTS_ROLE
    }
});

const Participants = mongoose.model('Participants', participantSchema);
export default Participants;