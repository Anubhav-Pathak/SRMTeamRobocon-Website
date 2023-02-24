import mongoose, { Schema, SchemaType } from "mongoose";

const alumniSchema = mongoose.Schema({
    memberId: {
        type: Object, 
        required: true,
        ref: "member",
    },
    quote: Schema.Types.String,
    description: Schema.Types.Array
});

const Alumni = mongoose.model("alumni", alumniSchema)

export default Alumni;