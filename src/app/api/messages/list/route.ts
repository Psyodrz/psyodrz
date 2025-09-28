import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Path to messages directory
    const messagesDir = path.join(process.cwd(), 'messages');
    
    // Check if directory exists
    if (!fs.existsSync(messagesDir)) {
      return NextResponse.json({ messages: [] });
    }
    
    // Read all files in the directory
    const files = fs.readdirSync(messagesDir);
    
    // Filter JSON files and read their content
    const messages = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        try {
          const filePath = path.join(messagesDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const data = JSON.parse(content);
          return {
            ...data,
            filename: file,
            filePath: filePath
          };
        } catch (err) {
          console.error(`Error reading file ${file}:`, err);
          return null;
        }
      })
      .filter(Boolean) // Remove null entries
      .sort((a, b) => {
        // Sort by receivedAt timestamp (newest first)
        const dateA = new Date(a.receivedAt || 0);
        const dateB = new Date(b.receivedAt || 0);
        return dateB.getTime() - dateA.getTime();
      });
    
    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error listing messages:', error);
    return NextResponse.json(
      { error: 'Failed to list messages' },
      { status: 500 }
    );
  }
} 