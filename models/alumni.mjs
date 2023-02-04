import mongoose, { Schema } from "mongoose";

const alumniSchema = mongoose.Schema({
    memberId: {
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: "member"
    },
    quote: Schema.Types.String,
    description: Schema.Types.Array
});

const Alumni = mongoose.model("alumni", alumniSchema)

export default Alumni;