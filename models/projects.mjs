import mongoose, { Schema, SchemaType } from "mongoose";

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    }
});

const Project = mongoose.model("project", projectSchema)

export default Project;