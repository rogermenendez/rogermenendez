import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    email		 : { type: String, required: true },
    name		 : {
        type: String,
        required: 'Enter a Name'
    },
    birthDate	 : {
        type: Date,
        required: 'Enter a Date'
    },
    address: Schema.Types.Mixed,
    createdAt: Date
});