import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
        },
        phone: {
            type: String,
            required: [true, "Please provide a phone number"],
        },
    },
    {
        timestamps: true,
    }
);

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
