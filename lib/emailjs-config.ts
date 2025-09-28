/**
 * EmailJS Configuration
 * Centralized configuration for EmailJS service
 */

export const EMAILJS_CONFIG = {
  // Your EmailJS credentials
  PUBLIC_KEY: 'OzNlTNeKkaLV39IcO',
  SERVICE_ID: 'service_0iqnncz',
  
  // Template IDs
  TEMPLATES: {
    CONTACT_FORM: 'template_contact', // Update this to match your EmailJS template ID
    AUTO_REPLY: 'template_auto_reply'
  },
  
  // Your email address
  TO_EMAIL: 'Adisrivastav23@gmail.com',
  
  // Auto-reply settings
  AUTO_REPLY: {
    ENABLED: false, // Temporarily disabled until template is created
    REPLY_TO: 'Adisrivastav23@gmail.com'
  }
} as const

/**
 * EmailJS template variables
 */
export interface ContactFormData {
  from_name: string
  from_email: string
  subject: string
  message: string
  to_email: string
}

export interface AutoReplyData {
  to_name: string
  to_email: string
  from_name: string
  from_email: string
  original_subject: string
}

/**
 * Initialize EmailJS
 */
export function initializeEmailJS() {
  if (typeof window !== 'undefined') {
    const emailjs = require('@emailjs/browser')
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
    return emailjs
  }
  return null
}
