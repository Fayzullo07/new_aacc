import mongoose from "mongoose";

const initiatorSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            required: [true, "Please provide a photo"],
        },
        firstname: {
            type: String,
            required: [true, "Please provide a firstname"],
        },
        lastname: {
            type: String,
            required: [true, "Please provide a lastname"],
        },
        birthday: {
            type: String,
            required: [true, "Please provide a birthday"],
        },
        birthplace: {
            type: String,
            required: [true, "Please provide a birthplace"],
        },
        addressResidential: {
            type: String,
            required: [true, "Please provide a addressResidential"],
        },
        workplace: {
            type: String,
            required: [true, "Please provide a workplace"],
        },
    },
    {
        timestamps: true,
    }
);

const Initiators = mongoose.models.Initiators || mongoose.model("Initiators", initiatorSchema);

export default Initiators;
