import mongoose from "mongoose";
import { Schema } from "mongoose";

const eventFinishedSchema = new mongoose.Schema(
    {
        idWait: {
            type: String,
            required: [true, "Please provide a id wait"],
        },
        photos: [String],
        place: {
            type: String,
            required: [true, "Please provide a place"],
        },
        date: {
            type: String,
            required: [true, "Please provide a place"],
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        partners: [String],
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

const EventFinished = mongoose.models.EventFinished || mongoose.model("EventFinished", eventFinishedSchema);

export default EventFinished;
