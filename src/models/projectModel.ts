import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a name"],
        },
        translations: {
            uz: {
                content: {
                    type: String,
                    required: [true, "Please provide a content"]
                }
            },
            ru: {
                content: {
                    type: String,
                    required: [true, "Please provide a content"]
                }
            },
            en: {
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

const Projects = mongoose.models.Projects || mongoose.model("Projects", projectsSchema);

export default Projects;
