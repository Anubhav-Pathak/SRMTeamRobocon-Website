import mongoose, { Schema } from "mongoose";

const taskSchema = mongoose.Schema({
    assignedOn: Date,
    description: Schema.Types.String,
    assignee: {
        type: Schema.Types.ObjectId,
        ref: "member",
        required: true
    },
    assignor: {
        type: Schema.Types.ObjectId,
        ref: "member",
        required: true
    },
    status: {
        type: String,
        enum: ['Completed','Pending','Cancelled'],
        required: true
    },
    deadline: {
        type: Date,
        required: true
    }
});

const Task = mongoose.model("task", taskSchema);

export default Task;