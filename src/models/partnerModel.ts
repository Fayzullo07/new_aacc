import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
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

const Partners = mongoose.models.Partners || mongoose.model("Partners", partnerSchema);

export default Partners;
