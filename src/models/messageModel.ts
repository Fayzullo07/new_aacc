import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
        },
        phone: {
            type: String,
            required: [true, "Please provide a phone number"],
        },
        desc: {
            type: String,
            required: [true, "Please provide a description"],
        },
        role: {
            type: String,
            required: [true, "Please choose role"]
        },
        isLegal: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true,
    }
);

const Messages = mongoose.models.Messages || mongoose.model("Messages", messageSchema);

export default Messages;
