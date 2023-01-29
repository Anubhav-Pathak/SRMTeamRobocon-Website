import mongoose, { Schema } from "mongoose";

const memberSchema = mongoose.Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    registerNo: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    phone: {
        type: Schema.Types.Number,
        required: true
    },
    linkedIn: String,
    instagram: String,
    domain: {
        type: Schema.Types.String,
        required: true
    },
    position: {
        type: Schema.Types.String,
        required: true
    },
    dob: Schema.Types.Date,
    doj: Schema.Types.Date,
    password: {
        type: String,
        required: false
    }
});

const Member = mongoose.model("member", memberSchema);

export default Member;