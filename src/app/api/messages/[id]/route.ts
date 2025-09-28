import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
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

interface FileMessage extends FallbackMessage {
  filePath: string;
}

// Load fallback data from JSON file
function loadFallbackMessages(): FallbackMessage[] {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'messages.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const messages = JSON.parse(fileData);
    
    return messages.map((message: Omit<FallbackMessage, '_id' | 'createdAt' | 'updatedAt'>, index: number) => {
      return {
        ...message,
        _id: `fallback-${index + 1}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    });
  } catch (error) {
    console.error('Error loading fallback messages:', error);
    return [];
  }
}

// Find a fallback message by ID
function findFallbackMessage(id: string): FallbackMessage | undefined {
  const fallbackMessages = loadFallbackMessages();
  return fallbackMessages.find((message: FallbackMessage) => message._id === id);
}

// Find a file-based message by ID
function findFileMessage(id: string): FileMessage | null {
  if (!id.startsWith('file-')) {
    return null;
  }
  
  const filenameBase = id.replace('file-', '').replace(/-/g, '-');
  
  try {
    const messagesDir = path.join(process.cwd(), 'messages');
    if (!fs.existsSync(messagesDir)) {
      return null;
    }
    
    const files = fs.readdirSync(messagesDir);
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const fileId = `file-${file.replace(/[^a-zA-Z0-9]/g, '-')}`;
        
        if (fileId === id) {
          const filePath = path.join(messagesDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const data = JSON.parse(content);
          
          return {
            _id: fileId,
            name: data.name,
            email: data.email,
            subject: data.subject || 'Message from Portfolio Contact Form',
            message: data.message,
            read: data.read || false,
            createdAt: data.receivedAt || new Date().toISOString(),
            updatedAt: data.receivedAt || new Date().toISOString(),
            filePath: filePath
          };
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error finding file message:', error);
    return null;
  }
}

// Update a file-based message
function updateFileMessage(filePath: string, updates: {read: boolean}): { success: boolean; message?: any; error?: any } {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    const updatedData = {
      ...data,
      read: updates.read
    };
    
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    
    return {
      success: true,
      message: updatedData
    };
  } catch (error) {
    console.error('Error updating file message:', error);
    return {
      success: false,
      error
    };
  }
}

// Delete a file-based message
function deleteFileMessage(filePath: string): { success: boolean; error?: any } {
  try {
    fs.unlinkSync(filePath);
    return { success: true };
  } catch (error) {
    console.error('Error deleting file message:', error);
    return { success: false, error };
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    if (!body || typeof body.read !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    if (params.id.startsWith('fallback-')) {
      const fallbackMessage = findFallbackMessage(params.id);
      
      if (fallbackMessage) {
        const updatedMessage = { 
          ...fallbackMessage,
          read: body.read,
          updatedAt: new Date().toISOString()
        };
        
        return NextResponse.json(updatedMessage);
      } else {
        return NextResponse.json(
          { error: 'Fallback message not found' },
          { status: 404 }
        );
      }
    }
    
    if (params.id.startsWith('file-')) {
      const fileMessage = findFileMessage(params.id);
      
      if (fileMessage) {
        const result = updateFileMessage(fileMessage.filePath, { read: body.read });
        
        if (result.success) {
          return NextResponse.json({
            ...fileMessage,
            read: body.read,
            updatedAt: new Date().toISOString()
          });
        } else {
          return NextResponse.json(
            { error: 'Failed to update file message' },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { error: 'File message not found' },
          { status: 404 }
        );
      }
    }

    try {
      await dbConnect();
      
      const message = await Message.findByIdAndUpdate(
        params.id,
        { $set: body },
        { new: true }
      );
  
      if (!message) {
        return NextResponse.json(
          { error: 'Message not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json(message);
    } catch (dbError) {
      console.error('Database error in PATCH:', dbError);
      
      if (params.id.length > 10) {
        return NextResponse.json(
          { error: 'Database connection error' },
          { status: 500 }
        );
      }
    }
  } catch (error: any) {
    console.error('Error in PATCH /api/messages/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    if (params.id.startsWith('fallback-')) {
      return NextResponse.json(
        { message: 'Message deleted successfully' },
        { status: 200 }
      );
    }
    
    if (params.id.startsWith('file-')) {
      const fileMessage = findFileMessage(params.id);
      
      if (fileMessage) {
        const result = deleteFileMessage(fileMessage.filePath);
        
        if (result.success) {
          return NextResponse.json(
            { message: 'Message deleted successfully' },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { error: 'Failed to delete file message' },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { error: 'File message not found' },
          { status: 404 }
        );
      }
    }

    try {
      await dbConnect();
      const message = await Message.findByIdAndDelete(params.id);
  
      if (!message) {
        return NextResponse.json(
          { error: 'Message not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { message: 'Message deleted successfully' },
        { status: 200 }
      );
    } catch (dbError) {
      console.error('Database error in DELETE:', dbError);
      return NextResponse.json(
        { message: 'Request processed but database is unavailable' },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error('Error in DELETE /api/messages/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 