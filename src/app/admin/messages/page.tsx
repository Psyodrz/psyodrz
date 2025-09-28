'use client';

import { useEffect, useState, MouseEvent } from 'react';
import { FiMail, FiUser, FiClock, FiCheck, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
    
    // Set up polling for new messages every 10 seconds
    const intervalId = setInterval(() => {
      fetchMessages(false); // Pass false to avoid showing loading state on regular updates
    }, 10000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchMessages = async (eventOrShowLoading?: MouseEvent<HTMLButtonElement> | boolean) => {
    const showLoading = typeof eventOrShowLoading === 'boolean' ? eventOrShowLoading : true;
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);
      
      // Add a timestamp parameter to avoid caching
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/messages?t=${timestamp}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        console.error('API did not return an array:', data);
        setMessages([]);
        setError('Invalid data format received from server');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch messages');
      if (showLoading) {
        toast.error('Failed to fetch messages');
      }
      // Don't reset messages on polling failure
      if (showLoading) {
        setMessages([]);
      }
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read: true }),
      });

      if (response.ok) {
        setMessages(messages.map(msg => 
          msg._id === id ? { ...msg, read: true } : msg
        ));
        toast.success('Message marked as read');
      } else {
        throw new Error(`Failed to mark message as read: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast.error('Failed to mark message as read');
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessages(messages.filter(msg => msg._id !== id));
        toast.success('Message deleted');
      } else {
        throw new Error(`Failed to delete message: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

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
        <div className="flex items-center mb-4">
          <Link href="/admin" className="mr-4 p-2 text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
            <FiArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Messages</h1>
        </div>
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

  if (messages.length === 0) {
    return (
      <div className="min-h-screen p-8">
        <div className="flex items-center mb-8">
          <Link href="/admin" className="mr-4 p-2 text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
            <FiArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Messages</h1>
        </div>
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">No messages yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="flex items-center mb-8">
        <Link href="/admin" className="mr-4 p-2 text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
          <FiArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold">Messages</h1>
      </div>
      
      <div className="grid gap-6">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`p-6 rounded-lg border ${
              message.read
                ? 'bg-gray-50 dark:bg-gray-800'
                : 'bg-white dark:bg-gray-900 border-primary'
            }`}
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
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                {!message.read && (
                  <button
                    onClick={() => markAsRead(message._id)}
                    className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full"
                  >
                    <FiCheck size={20} />
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(message._id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-2">{message.subject}</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {message.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 