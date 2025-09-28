import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

interface FallbackMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
  read?: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// Load fallback data from JSON file
function loadFallbackMessages(): FallbackMessage[] {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'messages.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const messages = JSON.parse(fileData);
    
    return messages.map((message: Omit<FallbackMessage, '_id' | 'createdAt' | 'updatedAt'>, index: number) => {
      const now = new Date();
      const daysAgo = Math.floor(Math.random() * 7);
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      
      return {
        ...message,
        _id: `fallback-${index + 1}`,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString()
      };
    });
  } catch (error) {
    console.error('Error loading fallback messages:', error);
    return [];
  }
}

// Function to load messages from files
function loadFileMessages(): FallbackMessage[] {
  try {
    const messagesDir = path.join(process.cwd(), 'messages');
    
    if (!fs.existsSync(messagesDir)) {
      return [];
    }
    
    const files = fs.readdirSync(messagesDir);
    
    const messages = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        try {
          const filePath = path.join(messagesDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const data = JSON.parse(content);
          
          const message: FallbackMessage = {
            _id: `file-${file.replace(/[^a-zA-Z0-9]/g, '-')}`,
            name: data.name,
            email: data.email,
            subject: data.subject || 'Message from Portfolio Contact Form',
            message: data.message,
            read: false,
            createdAt: data.receivedAt || new Date().toISOString(),
            updatedAt: data.receivedAt || new Date().toISOString()
          };
          
          return message;
        } catch (err) {
          console.error(`Error reading file ${file}:`, err);
          return null;
        }
      })
      .filter((msg): msg is NonNullable<typeof msg> => msg !== null);
    
    return messages;
  } catch (error) {
    console.error('Error loading file messages:', error);
    return [];
  }
}

export async function POST(request: Request) {
  console.log('POST /api/messages - Request received');
  
  try {
    const body = await request.json();
    console.log('Request body:', JSON.stringify(body));

    if (!body.name || !body.email || !body.subject || !body.message) {
      console.log('Validation error: Missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      console.log('Validation error: Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    let messageId = null;

    try {
      console.log('Attempting to connect to MongoDB...');
      await dbConnect();
      console.log('Connected to MongoDB successfully');
      
      const message = await Message.create(body);
      messageId = message._id;
      console.log('Message saved to database with ID:', messageId);
    } catch (dbError) {
      console.error('Database error details:', dbError);
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log('Email credentials found, attempting to send email...');
      
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        console.log('Email transporter created');

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `New Message from ${body.name}: ${body.subject}`,
          text: `
            Name: ${body.name}
            Email: ${body.email}
            Subject: ${body.subject}
            Message: ${body.message}
            ${messageId ? `Message ID: ${messageId}` : ''}
          `,
        };

        console.log('Sending email to:', process.env.EMAIL_USER);
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Failed to send email notification - detailed error:', emailError);
        
        if (!messageId) {
          return NextResponse.json(
            { error: 'Failed to save message and send notification' },
            { status: 500 }
          );
        }
      }
    } else {
      console.log('Email credentials not found in environment variables');
    }

    console.log('Request completed successfully');
    return NextResponse.json(
      { message: 'Message sent successfully', id: messageId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Unhandled error in POST /api/messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log('GET /api/messages - Request received');
  
  try {
    let dbMessages: FallbackMessage[] = [];
    let fileMessages: FallbackMessage[] = [];
    
    try {
      console.log('Attempting to connect to MongoDB...');
      await dbConnect();
      console.log('Connected to MongoDB successfully');
      
      dbMessages = await Message.find().sort({ createdAt: -1 });
      console.log(`Found ${dbMessages.length} messages in database`);
    } catch (dbError) {
      console.error('Database connection error:', dbError);
    }
    
    fileMessages = loadFileMessages();
    console.log(`Found ${fileMessages.length} messages in files`);
    
    let allMessages = [...dbMessages, ...fileMessages];
    
    allMessages.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
    
    if (allMessages.length === 0) {
      console.log('No messages found in database or files, using fallback data');
      allMessages = loadFallbackMessages();
      console.log(`Loaded ${allMessages.length} fallback messages`);
    }
    
    return NextResponse.json(allMessages || []);
  } catch (error: any) {
    console.error('Unhandled error in GET /api/messages:', error);
    
    try {
      const fallbackMessages = loadFallbackMessages();
      return NextResponse.json(fallbackMessages);
    } catch (fallbackError) {
      return NextResponse.json([]);
    }
  }
} 