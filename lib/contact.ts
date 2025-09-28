/**
 * Contact form utilities for email and WhatsApp integration
 */

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

/**
 * Formats contact form data for email
 */
export function formatEmailData(data: ContactFormData): { subject: string; body: string } {
  const subject = data.subject || `Portfolio Contact from ${data.name}`;
  const body = `
Hello Aditya,

You have received a new message from your portfolio website:

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
This message was sent from your portfolio contact form.
Reply directly to: ${data.email}
  `.trim();

  return { subject, body };
}

/**
 * Formats contact form data for WhatsApp
 */
export function formatWhatsAppData(data: ContactFormData): string {
  const message = `Hello! I'm ${data.name} and I'd like to get in touch with you.

Email: ${data.email}

Message: ${data.message}

I found you through your portfolio website.`;

  return encodeURIComponent(message);
}

/**
 * Creates email link with formatted data
 */
export function createEmailLink(data: ContactFormData): string {
  const { subject, body } = formatEmailData(data);
  return `mailto:adisrivastav23@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Creates WhatsApp link with formatted data
 */
export function createWhatsAppLink(data: ContactFormData): string {
  const message = formatWhatsAppData(data);
  const phoneNumber = '919876543210'; // TODO: Replace with your actual WhatsApp number
  return `https://wa.me/${phoneNumber}?text=${message}`;
}

/**
 * Handles form submission - opens email or WhatsApp based on user choice
 */
export function handleContactSubmission(data: ContactFormData, method: 'email' | 'whatsapp' = 'email'): void {
  if (method === 'email') {
    window.open(createEmailLink(data), '_blank');
  } else if (method === 'whatsapp') {
    window.open(createWhatsAppLink(data), '_blank');
  }
}

/**
 * Validates contact form data
 */
export function validateContactForm(data: Partial<ContactFormData>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
