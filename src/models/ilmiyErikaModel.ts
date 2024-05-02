import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
        },
        desc: {
            type: String,
            required: [true, "Please provide a phone desc"],
        },
    },
    {
        timestamps: true,
    }
);

const ilmiyEtikaSchema = new mongoose.Schema(
    {
        getId: {
            type: String,
            default: 'fayzullo'
        },
        comments: [commentSchema],
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

const IlmiyEtika = mongoose.models.IlmiyEtika || mongoose.model("IlmiyEtika", ilmiyEtikaSchema);

export default IlmiyEtika;
