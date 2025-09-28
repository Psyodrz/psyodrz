import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project, { IProject } from '@/models/Project';
import fs from 'fs';
import path from 'path';

// Load fallback data from JSON file
function loadFallbackProjects() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error loading fallback projects:', error);
    return [];
  }
}

// GET - Fetch all projects
export async function GET(req: NextRequest) {
  try {
    let projects = [];
    
    try {
      // Try to connect to MongoDB first
      await connectDB();
      
      // Get query params
      const { searchParams } = new URL(req.url);
      const featured = searchParams.get('featured');
      
      // Build query
      const query: any = {};
      if (featured === 'true') {
        query.featured = true;
      }
      
      // Find projects and sort by order and creation date
      projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
      
      // If no projects found in DB, use fallback data
      if (projects.length === 0) {
        console.log('No projects found in database, using fallback data');
        projects = loadFallbackProjects();
      }
    } catch (error) {
      // If MongoDB connection fails, use fallback data
      console.error('MongoDB connection error, using fallback data:', error);
      projects = loadFallbackProjects();
    }
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    // Last resort fallback
    try {
      const fallbackProjects = loadFallbackProjects();
      return NextResponse.json(fallbackProjects);
    } catch (fallbackError) {
      return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
  }
}

// POST - Create a new project
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    // Get request body
    const body = await req.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.github || !body.demo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new project
    const project = await Project.create(body);
    
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    
    // Handle validation errors
    if (error instanceof Error && 'name' in error && error.name === 'ValidationError') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
} 