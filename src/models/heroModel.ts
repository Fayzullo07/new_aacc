import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            required: [true, "Please provide a photo"],
        },
        translations: {
            uz: {
                title: {
                    type: String,
                    required: [true, "Please provide a title uz"]
                },
                desc: {
                    type: String,
                    required: [true, "Please provide a desc ru"]
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

const Hero = mongoose.models.Hero || mongoose.model("Hero", heroSchema);

export default Hero;
