import mongoose from "mongoose";

const userLegalSchema = new mongoose.Schema(
    {
        translations: {
            uz: {
                name: {
                    type: String,
                    required: [true, "Please provide a name uz"]
                },
                address: {
                    type: String,
                    required: [true, "Please provide a desc uz"]
                },
                activity: {
                    type: String,
                    required: [true, "Please provide a activity uz"]
                },
                desc: {
                    type: String,
                    required: [true, "Please provide a desc uz"]
                }
            },
            ru: {
                name: {
                    type: String,
                    required: [true, "Please provide a name ru"]
                },
                address: {
                    type: String,
                    required: [true, "Please provide a desc ru"]
                },
                activity: {
                    type: String,
                    required: [true, "Please provide a activity ru"]
                },
                desc: {
                    type: String,
                    required: [true, "Please provide a desc ru"]
                }
            },
            en: {
                name: {
                    type: String,
                    required: [true, "Please provide a name en"]
                },
                address: {
                    type: String,
                    required: [true, "Please provide a desc en"]
                },
                activity: {
                    type: String,
                    required: [true, "Please provide a activity en"]
                },
                desc: {
                    type: String,
                    required: [true, "Please provide a desc en"]
                }
            },
        }
    },
    {
        timestamps: true,
    }
);

const UsersLegal = mongoose.models.UsersLegal || mongoose.model("UsersLegal", userLegalSchema);

export default UsersLegal;
