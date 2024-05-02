import mongoose from "mongoose";

const newSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            required: [true, "Please provide a photo"]
        },
        translations: {
            uz: {
                title: {
                    type: String,
                    required: [true, "Please provide a title"]
                },
                content: {
                    type: String,
                    required: [true, "Please provide a content"]
                }
            },
            ru: {
                title: {
                    type: String,
                    required: [true, "Please provide a title"]
                },
                content: {
                    type: String,
                    required: [true, "Please provide a content"]
                }
            },
            en: {
                title: {
                    type: String,
                    required: [true, "Please provide a title"]
                },
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

const News = mongoose.models.News || mongoose.model("News", newSchema);

export default News;
