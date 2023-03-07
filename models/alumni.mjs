import mongoose, { Schema, SchemaType } from "mongoose";

const alumniSchema = mongoose.Schema({
    memberId: {
        type: Object, 
        required: true,
        ref: "member",
    },
    passoutYear: {
        type: Number,
        required: true,
    },
    quote: Schema.Types.String,
    description: Schema.Types.Array
});

const Alumni = mongoose.model("alumni", alumniSchema)

export default Alumni;