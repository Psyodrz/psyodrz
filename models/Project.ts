/**
 * Project interface and types for the portfolio
 * Since we're not using MongoDB, this is just for TypeScript type safety
 */

export interface Project {
  id?: string;
  title: string;
  description: string;
  color: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProjectFormData {
  title: string;
  description: string;
  color: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  order: number;
}

/**
 * Validates project data
 */
export function validateProject(data: Partial<ProjectFormData>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters long');
  }

  if (!data.github || !isValidUrl(data.github)) {
    errors.push('Please enter a valid GitHub URL');
  }

  if (!data.demo || !isValidUrl(data.demo)) {
    errors.push('Please enter a valid demo URL');
  }

  if (!data.tags || data.tags.length === 0) {
    errors.push('At least one tag is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Helper function to validate URLs
 */
function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Default project template
 */
export const defaultProject: ProjectFormData = {
  title: '',
  description: '',
  color: 'from-blue-500 to-purple-600',
  tags: [],
  github: '',
  demo: '',
  featured: false,
  order: 0,
};
