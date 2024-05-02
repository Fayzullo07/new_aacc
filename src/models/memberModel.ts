import mongoose from "mongoose";

const membersSchema = new mongoose.Schema(
    {
        photo: String,
        name: {
            type: String,
            required: [true, "Please provide a name"],
        },
        isYuridik: {
            type: Boolean,
            default: false
        },
        address: {
            type: String,
            required: [true, "Please provide a address"],
        },
        translations: {
            uz: {
                content: {
                    type: String,
                    required: [true, "Please provide a content"]
                }
            },
            ru: {
                content: {
                    type: String,
                    required: [true, "Please provide a content"]
                }
            },
            en: {
                content: {
                    type: String,
                    required: [true, "Please provide a content"]
                }
            }
        }
    },
    {
        timestamps: true,
    }
);

const Members = mongoose.models.Members || mongoose.model("Members", membersSchema);

export default Members;
