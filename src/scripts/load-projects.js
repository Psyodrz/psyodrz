const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

// Project model schema
const projectSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

// Create Project model
const Project = mongoose.model('Project', projectSchema);

// Load sample projects from JSON file
async function loadProjects() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Read projects from JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const projects = JSON.parse(fileData);
    
    console.log(`Found ${projects.length} projects in JSON file`);

    // Clear existing projects
    console.log('Clearing existing projects...');
    await Project.deleteMany({});
    
    // Insert new projects
    console.log('Inserting new projects...');
    await Project.insertMany(projects);
    
    console.log('Sample projects loaded successfully!');
    
    // Print all projects
    const loadedProjects = await Project.find().sort({ order: 1 });
    console.log(`Inserted ${loadedProjects.length} projects:`);
    loadedProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
    });
    
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error loading projects:', error);
    process.exit(1);
  }
}

// Execute the function
loadProjects(); 