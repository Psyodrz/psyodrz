/**
 * Email Service with Auto-Reply functionality
 * Handles contact form submissions and automatic replies
 */

import { EMAILJS_CONFIG, ContactFormData, AutoReplyData } from './emailjs-config'

export interface EmailResult {
  success: boolean
  message: string
  error?: string
}

/**
 * Send contact form email
 */
export async function sendContactEmail(formData: ContactFormData): Promise<EmailResult> {
  try {
    if (typeof window === 'undefined') {
      throw new Error('EmailJS can only be used in the browser')
    }

    const emailjs = await import('@emailjs/browser')
    
    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
    
    // Prepare email data
    const emailData = {
      from_name: formData.from_name,
      from_email: formData.from_email,
      subject: formData.subject,
      message: formData.message,
      to_email: EMAILJS_CONFIG.TO_EMAIL,
      reply_to: formData.from_email
    }
    
    // Send main contact email
    console.log('Sending contact email with data:', emailData)
    console.log('Using service ID:', EMAILJS_CONFIG.SERVICE_ID)
    console.log('Using template ID:', EMAILJS_CONFIG.TEMPLATES.CONTACT_FORM)
    
    // Send email with template
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.CONTACT_FORM,
      emailData,
      EMAILJS_CONFIG.PUBLIC_KEY
    )
    
    console.log('Contact email sent successfully:', result)
    
    // Send auto-reply if enabled (temporarily disabled for debugging)
    if (EMAILJS_CONFIG.AUTO_REPLY.ENABLED) {
      try {
        console.log('Attempting to send auto-reply...')
        await sendAutoReply({
          to_name: formData.from_name,
          to_email: formData.from_email,
          from_name: 'Aditya Srivastav',
          from_email: EMAILJS_CONFIG.TO_EMAIL, // Send from your email
          original_subject: formData.subject
        })
        console.log('Auto-reply sent successfully')
      } catch (autoReplyError) {
        console.error('Auto-reply failed:', autoReplyError)
        console.log('This is expected if template_auto_reply is not created yet')
        // Don't fail the main email if auto-reply fails
      }
    }
    
    return {
      success: true,
      message: 'Thank you for your message! I\'ll get back to you within 24 hours.'
    }
    
  } catch (error) {
    console.error('Error sending contact email:', error)
    return {
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or contact me directly.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Send auto-reply email
 */
async function sendAutoReply(autoReplyData: AutoReplyData): Promise<void> {
  try {
    const emailjs = await import('@emailjs/browser')
    
    // Initialize EmailJS for auto-reply
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
    
    const autoReplyEmailData = {
      to_name: autoReplyData.to_name,
      to_email: autoReplyData.to_email,
      from_name: autoReplyData.from_name,
      from_email: autoReplyData.from_email,
      original_subject: autoReplyData.original_subject,
      reply_to: EMAILJS_CONFIG.TO_EMAIL
    }
    
    console.log('Sending auto-reply with data:', autoReplyEmailData)
    
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.AUTO_REPLY,
      autoReplyEmailData,
      EMAILJS_CONFIG.PUBLIC_KEY
    )
    
    console.log('Auto-reply sent successfully:', result)
  } catch (error) {
    console.error('Error sending auto-reply:', error)
    throw error // Re-throw so we can catch it in the main function
  }
}
