import mongoose from "mongoose";

const userPhysicalSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            required: [true, "Please provide a photo"],
        },
        firstname: {
            type: String,
            required: [true, "Please provide a firstname"],
        },
        lastname: {
            type: String,
            required: [true, "Please provide a lastname"],
        },
        thirdname: {
            type: String,
            required: [true, "Please provide a thirdname"],
        },
        scienceID: {
            type: String,
            required: [true, "Please provide a scienceID"],
        },
        translations: {
            uz: {
                workAddress: {
                    type: String,
                    required: [true, "Please provide a workAddress uz"]
                },
                workPosition: {
                    type: String,
                    required: [true, "Please provide a workPosition uz"]
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
                workAddress: {
                    type: String,
                    required: [true, "Please provide a workAddress ru"]
                },
                workPosition: {
                    type: String,
                    required: [true, "Please provide a workPosition ru"]
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
                workAddress: {
                    type: String,
                    required: [true, "Please provide a workAddress en"]
                },
                workPosition: {
                    type: String,
                    required: [true, "Please provide a workPosition en"]
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

const UsersPhysical = mongoose.models.UsersPhysical || mongoose.model("UsersPhysical", userPhysicalSchema);

export default UsersPhysical;
