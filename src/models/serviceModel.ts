import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        translations: {
            uz: {
                title: {
                    type: String,
                    required: [true, "Please provide a title uz"]
                },
                desc: {
                    type: String,
                    required: [true, "Please provide a desc uz"]
                }
            },
            ru: {
                title: {
                    type: String,
                    required: [true, "Please provide a title ru"]
                },
                desc: {
                    type: String,
                    required: [true, "Please provide a desc ru"]
                }
            },
            en: {
                title: {
                    type: String,
                    required: [true, "Please provide a title en"]
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

const Services = mongoose.models.Services || mongoose.model("Services", serviceSchema);

export default Services;
