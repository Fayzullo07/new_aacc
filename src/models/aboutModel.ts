import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            required: [true, "Please provide a photo"],
        },
        secondPhoto: {
            type: String,
            required: [true, "Please provide a second photo"],
        },
        translations: {
            uz: {
                desc: {
                    type: String,
                    required: [true, "Please provide a desc ru"]
                }
            },
            ru: {
                desc: {
                    type: String,
                    required: [true, "Please provide a desc ru"]
                }
            },
            en: {
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

const About = mongoose.models.About || mongoose.model("About", aboutSchema);

export default About;
