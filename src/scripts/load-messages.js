const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

// Message model schema
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

// Create Message model
const Message = mongoose.model('Message', messageSchema);

// Load sample messages from JSON file
async function loadMessages() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Read messages from JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'messages.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const messages = JSON.parse(fileData);
    
    console.log(`Found ${messages.length} messages in JSON file`);

    // Clear existing messages
    console.log('Clearing existing messages...');
    await Message.deleteMany({});
    
    // Insert new messages with timestamps spread over the last week
    console.log('Inserting new messages...');
    
    // Create messages with timestamps spread over the last few days
    const now = new Date();
    const messagesWithDates = messages.map((message, index) => {
      // Create dates ranging from 7 days ago to today
      const daysAgo = 7 - Math.floor((index / messages.length) * 7);
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      
      return {
        ...message,
        createdAt: date
      };
    });
    
    await Message.insertMany(messagesWithDates);
    
    console.log('Sample messages loaded successfully!');
    
    // Print all messages
    const loadedMessages = await Message.find().sort({ createdAt: -1 });
    console.log(`Inserted ${loadedMessages.length} messages:`);
    loadedMessages.forEach((message, index) => {
      console.log(`${index + 1}. From: ${message.name}, Subject: ${message.subject}, Date: ${message.createdAt.toLocaleDateString()}`);
    });
    
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error loading messages:', error);
    process.exit(1);
  }
}

// Execute the function
loadMessages(); 