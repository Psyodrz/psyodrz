'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiCheck, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const INITIAL_FORM_STATE = {
  title: '',
  description: '',
  color: 'from-blue-500 to-purple-600',
  tags: '',
  github: '',
  demo: '',
  featured: false,
  order: 0,
};

const COLOR_OPTIONS = [
  { value: 'from-blue-500 to-purple-600', label: 'Blue to Purple' },
  { value: 'from-green-500 to-teal-600', label: 'Green to Teal' },
  { value: 'from-red-500 to-orange-600', label: 'Red to Orange' },
  { value: 'from-purple-500 to-pink-600', label: 'Purple to Pink' },
  { value: 'from-blue-400 to-indigo-600', label: 'Blue to Indigo' },
  { value: 'from-yellow-400 to-orange-500', label: 'Yellow to Orange' },
  { value: 'from-cyan-500 to-blue-500', label: 'Cyan to Blue' },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.github.trim()) {
      newErrors.github = 'GitHub URL is required';
    } else if (!isValidUrl(formData.github)) {
      newErrors.github = 'Please enter a valid URL';
    }
    
    if (!formData.demo.trim()) {
      newErrors.demo = 'Demo URL is required';
    } else if (!isValidUrl(formData.demo)) {
      newErrors.demo = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert comma-separated tags to array
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      const projectData = {
        ...formData,
        tags: tagsArray,
        order: parseInt(formData.order.toString()),
      };
      
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create project');
      }
      
      toast.success('Project created successfully');
      router.push('/admin/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen p-6 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/projects" className="inline-flex items-center text-primary hover:text-blue-600 mb-6">
          <FiArrowLeft className="mr-1" /> Back to Projects
        </Link>
        
        <h1 className="text-3xl font-bold font-heading tracking-wider mb-8">Add New Project</h1>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm ${
                    errors.title
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                  } dark:bg-gray-700 dark:text-white sm:text-sm`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
                )}
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm ${
                    errors.description
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                  } dark:bg-gray-700 dark:text-white sm:text-sm`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                )}
              </div>
              
              {/* Color */}
              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Color Gradient
                </label>
                <div className="mt-1 flex space-x-2">
                  <select
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    {COLOR_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  
                  <div className={`h-10 w-20 bg-gradient-to-br ${formData.color} rounded-md`}></div>
                </div>
              </div>
              
              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="React, TypeScript, Tailwind CSS"
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Enter tags separated by commas (e.g. React, TypeScript, UI/UX)
                </p>
              </div>
              
              {/* GitHub URL */}
              <div>
                <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GitHub URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username/project"
                  className={`block w-full rounded-md shadow-sm ${
                    errors.github
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                  } dark:bg-gray-700 dark:text-white sm:text-sm`}
                />
                {errors.github && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.github}</p>
                )}
              </div>
              
              {/* Demo URL */}
              <div>
                <label htmlFor="demo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Demo URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="demo"
                  name="demo"
                  value={formData.demo}
                  onChange={handleChange}
                  placeholder="https://your-project-demo.com"
                  className={`block w-full rounded-md shadow-sm ${
                    errors.demo
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                  } dark:bg-gray-700 dark:text-white sm:text-sm`}
                />
                {errors.demo && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.demo}</p>
                )}
              </div>
              
              {/* Featured & Order */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Featured Project
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Featured projects will be highlighted on your portfolio
                  </p>
                </div>
                
                <div>
                  <label htmlFor="order" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    min="0"
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Lower numbers will be displayed first
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <Link 
                href="/admin/projects" 
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiX className="mr-2 -ml-1 h-5 w-5" />
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiCheck className="mr-2 -ml-1 h-5 w-5" />
                {isSubmitting ? 'Saving...' : 'Save Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 