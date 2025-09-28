import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Uses Node.js APIs (fs/path, nodemailer); ensure Node runtime on Vercel/Next.js
export const runtime = 'nodejs';

interface FallbackMessage {
  name: string;
  email: string;
  subject?: string;
{{ ... }}
    console.error('Error loading file messages:', error);
    return [];
  }
}

export async function POST(req: NextRequest) {
  console.log('POST /api/messages - Request received');
  
  try {
    const body = await req.json();
    console.log('Request body:', JSON.stringify(body));

    if (!body.name || !body.email || !body.subject || !body.message) {
      console.log('Validation error: Missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
{{ ... }}
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