import mongoose, { Schema, models } from 'mongoose';
var projectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    color: {
        type: String,
        required: [true, 'Color gradient is required'],
        default: 'from-blue-500 to-purple-600',
    },
    tags: {
        type: [String],
        default: [],
    },
    github: {
        type: String,
        required: [true, 'GitHub URL is required'],
    },
    demo: {
        type: String,
        required: [true, 'Demo URL is required'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
var Project = models.Project || mongoose.model('Project', projectSchema);
export default Project;
