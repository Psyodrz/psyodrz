import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Uses Node.js APIs (fs/path, nodemailer); ensure Node runtime on Vercel/Next.js
export const runtime = 'nodejs';

// Function to save messages to a local file
async function saveMessageToFile(message: any) {
  try {
    // Create messages directory if it doesn't exist
    const messagesDir = path.join(process.cwd(), 'messages');
    if (!fs.existsSync(messagesDir)) {
      fs.mkdirSync(messagesDir, { recursive: true });
    }

    // Create a unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `${messagesDir}/message-${timestamp}.json`;
    
    // Add timestamp to message
    const messageWithTimestamp = {
      ...message,
      receivedAt: new Date().toISOString(),
    };
    
    // Write to file
    fs.writeFileSync(filename, JSON.stringify(messageWithTimestamp, null, 2));
    console.log(`Message saved to file: ${filename}`);
    
    return { success: true, filename };
  } catch (error) {
    console.error('Error saving message to file:', error);
    return { success: false, error };
  }
}

export async function POST(req: NextRequest) {
  console.log('POST /api/contact - Request received');
  
  try {
    const body = await req.json();
    console.log('Request body:', JSON.stringify(body));

    // Input validation
    if (!body.name || !body.email || !body.subject || !body.message) {
      console.log('Validation error: Missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      console.log('Validation error: Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // For demonstration purposes, log the message details
    console.log('Message details:');
    console.log('- From:', body.name, '(' + body.email + ')');
    console.log('- Subject:', body.subject);
    console.log('- Message:', body.message);

    let emailSent = false;
    let fileStorage = false;

    // Try to send email if credentials are configured
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
          `,
        };

        console.log('Sending email to:', process.env.EMAIL_USER);
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        emailSent = true;
      } catch (emailError) {
        console.error('Failed to send email notification - detailed error:', emailError);
        // Continue with file storage fallback
      }
    } else {
      console.log('Email credentials not found in environment variables');
    }

    // If email failed or wasn't configured, save to file
    if (!emailSent) {
      console.log('Using file storage fallback...');
      const saveResult = await saveMessageToFile(body);
      fileStorage = saveResult.success;
      
      if (!fileStorage) {
        console.error('File storage also failed');
        // Only return error if both email and file storage failed
        if (!emailSent && !fileStorage) {
          return NextResponse.json(
            { error: 'Failed to process message: All storage methods failed' },
            { status: 500 }
          );
        }
      }
    }

    // Return appropriate success message
    return NextResponse.json(
      { 
        message: 'Message received successfully',
        emailSent,
        fileStorage,
        storageMethod: emailSent ? 'email' : 'file'
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Unhandled error in POST /api/contact:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 