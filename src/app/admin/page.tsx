'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiGrid, FiMail, FiLayers, FiPlusCircle, FiSettings } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        
        // Fetch messages
        const messagesResponse = await fetch('/api/messages');
        const messages = await messagesResponse.json();
        setUnreadMessages(messages.filter((msg: any) => !msg.read).length);
        
        // Fetch projects
        const projectsResponse = await fetch('/api/projects');
        const projects = await projectsResponse.json();
        setProjectCount(projects.length);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCounts();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold font-heading tracking-wider text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <Link href="/" className="text-sm font-medium text-primary hover:text-blue-600 transition-colors">
              Back to Site
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Admin Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Projects Card */}
          <Link 
            href="/admin/projects"
            className="group bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-all hover:shadow-lg hover:scale-[1.02] hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <div className="px-6 py-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <FiLayers className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Projects
                    </dt>
                    <dd>
                      <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {projectCount}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-800 px-6 py-3">
              <div className="text-sm flex justify-between items-center">
                <div className="font-medium text-blue-700 dark:text-blue-200">
                  View Projects
                </div>
                <div className="text-blue-500 dark:text-blue-300 group-hover:translate-x-2 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Add Project Card */}
          <Link 
            href="/admin/projects/new"
            className="group bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-all hover:shadow-lg hover:scale-[1.02] hover:bg-green-50 dark:hover:bg-gray-700"
          >
            <div className="px-6 py-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <FiPlusCircle className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Add New Project
                    </dt>
                    <dd>
                      <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        Create
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-green-100 dark:bg-green-800 px-6 py-3">
              <div className="text-sm flex justify-between items-center">
                <div className="font-medium text-green-700 dark:text-green-200">
                  Add New Project
                </div>
                <div className="text-green-500 dark:text-green-300 group-hover:translate-x-2 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Messages Card */}
          <Link 
            href="/admin/messages"
            className="group bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-all hover:shadow-lg hover:scale-[1.02] hover:bg-purple-50 dark:hover:bg-gray-700"
          >
            <div className="px-6 py-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <FiMail className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Unread Messages
                    </dt>
                    <dd className="flex items-center">
                      <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {unreadMessages}
                      </div>
                      {unreadMessages > 0 && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                          New
                        </span>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-800 px-6 py-3">
              <div className="text-sm flex justify-between items-center">
                <div className="font-medium text-purple-700 dark:text-purple-200">
                  View Messages
                </div>
                <div className="text-purple-500 dark:text-purple-300 group-hover:translate-x-2 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Quick Actions</h3>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              href="/admin/projects/new"
              className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <FiPlusCircle className="h-6 w-6 text-green-500 mb-2" />
              <span className="text-sm text-gray-700 dark:text-gray-300">New Project</span>
            </Link>
            <Link 
              href="/admin/messages"
              className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <FiMail className="h-6 w-6 text-purple-500 mb-2" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Check Messages</span>
            </Link>
            <Link 
              href="/"
              className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <FiGrid className="h-6 w-6 text-blue-500 mb-2" />
              <span className="text-sm text-gray-700 dark:text-gray-300">View Website</span>
            </Link>
            <Link 
              href="/admin/settings"
              className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <FiSettings className="h-6 w-6 text-gray-500 mb-2" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Settings</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 