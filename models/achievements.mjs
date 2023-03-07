import mongoose, { Schema, SchemaType } from "mongoose";

const achievementSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    }
});

const Alumni = mongoose.model("achievement", achievementSchema)

export default Alumni;