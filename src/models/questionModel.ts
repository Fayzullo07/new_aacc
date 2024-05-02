import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        uz: {
            question: {
                type: String,
                required: [true, "Please provide a question uz"]
            },
            desc: {
                type: String,
                required: [true, "Please provide a desc ru"]
            }
        },
        ru: {
            question: {
                type: String,
                required: [true, "Please provide a question ru"]
            },
            desc: {
                type: String,
                required: [true, "Please provide a desc ru"]
            }
        },
        en: {
            question: {
                type: String,
                required: [true, "Please provide a question en"]
            },
            desc: {
                type: String,
                required: [true, "Please provide a desc en"]
            }
        },

    },
    {
        timestamps: true,
    }
);

const Questions = mongoose.models.Questions || mongoose.model("Questions", questionSchema);

export default Questions;
