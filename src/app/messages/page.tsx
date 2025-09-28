'use client';

import { useState, useEffect } from 'react';
import { FiMail, FiUser, FiClock, FiRefreshCw } from 'react-icons/fi';

interface Message {
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
  filename?: string;
}

export default function LocalMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/messages/list');
      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }
      
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-4">Local Messages</h1>
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded">
          <p>Error: {error}</p>
          <button 
            onClick={fetchMessages}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Local Messages</h1>
        <button 
          onClick={fetchMessages}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <FiRefreshCw /> Refresh
        </button>
      </div>
      
      {messages.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">No messages found. Check that you have messages saved in the "messages" directory.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border bg-white dark:bg-gray-900 shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <FiUser className="text-primary" />
                    {message.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <FiMail className="text-primary" />
                    {message.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <FiClock className="text-primary" />
                    {new Date(message.receivedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-2">{message.subject}</h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {message.message}
              </p>
              
              {message.filename && (
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                  File: {message.filename}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 