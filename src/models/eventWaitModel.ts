import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
        },
        phone: {
            type: String,
            required: [true, "Please provide a phone number"],
        },
    },
    {
        timestamps: true,
    }
);
const eventWaitSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            required: [true, "Please provide a photo"],
        },
        place: {
            type: String,
            required: [true, "Please provide a place"],
        },
        date: {
            type: String,
            required: [true, "Please provide a place"],
        },
        users: [userSchema],
        partners: [String],
        status: {
            type: Boolean,
            default: true
        },
        translations: {
            uz: {
                name: {
                    type: String,
                    required: [true, "Please provide a title uz"]
                },
                form: {
                    type: String,
                    required: [true, "Please provide a form uz"]
                },
                target: {
                    type: String,
                    required: [true, "Please provide a desc uz"]
                },
                result: {
                    type: String,
                    required: [true, "Please provide a desc uz"]
                },
            },
            ru: {
                name: {
                    type: String,
                    required: [true, "Please provide a title ru"]
                },
                form: {
                    type: String,
                    required: [true, "Please provide a desc ru"]
                },
                target: {
                    type: String,
                    required: [true, "Please provide a desc ru"]
                },
                result: {
                    type: String,
                    required: [true, "Please provide a desc ru"]
                },
            },
            en: {
                name: {
                    type: String,
                    required: [true, "Please provide a title en"]
                },
                form: {
                    type: String,
                    required: [true, "Please provide a desc en"]
                },
                target: {
                    type: String,
                    required: [true, "Please provide a desc en"]
                },
                result: {
                    type: String,
                    required: [true, "Please provide a desc en"]
                },
            },
        }
    },
    {
        timestamps: true,
    }
);

const EventWait = mongoose.models.EventWait || mongoose.model("EventWait", eventWaitSchema);

export default EventWait;
