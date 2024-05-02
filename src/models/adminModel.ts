import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a name"],
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
        },
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
