# EmailJS Templates Setup Guide

## Template 1: Contact Form (template_contact)

**Template ID:** `template_contact`

**Subject:** `New Contact Form Message from {{from_name}}`

**Content:**
```
Hello Aditya,

You have received a new message through your portfolio contact form:

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{from_email}}
Sent from: Portfolio Contact Form
```

## Template 2: Auto-Reply (template_auto_reply)

**Template ID:** `template_auto_reply`

**Subject:** `Thank you for contacting Aditya Srivastav - {{original_subject}}`

**Content:**
```
Hello {{to_name}},

Thank you for reaching out through my portfolio contact form! I have received your message regarding "{{original_subject}}".

I'll review your message and get back to you within 24 hours. If your inquiry is urgent, please feel free to contact me directly at Adisrivastav23@gmail.com.

Best regards,
Aditya Srivastav

---
This is an automated reply. Please do not reply to this email.
```

## ⚠️ IMPORTANT: Auto-Reply Setup

**For the auto-reply to work, you need to:**

1. **Create a separate EmailJS service** for auto-replies:
   - Go to EmailJS Dashboard → Services
   - Add a new service (Gmail)
   - Name it "Auto Reply Service" 
   - Use the same Gmail account but create a separate service

2. **Update the service ID** in your code:
   - The auto-reply template should use the same service as the contact form
   - Make sure both templates are under the same service: `service_0iqnncz`

3. **Test the auto-reply** by sending a test message through your contact form

## Setup Instructions:

1. Go to your EmailJS dashboard
2. Navigate to "Email Templates"
3. Create both templates with the exact Template IDs and content above
4. Make sure your Gmail service is connected
5. Test both templates to ensure they work correctly

## Template Variables Used:

**Contact Form Template:**
- {{from_name}} - Sender's name
- {{from_email}} - Sender's email
- {{subject}} - Message subject
- {{message}} - Message content
- {{to_email}} - Your email address

**Auto-Reply Template:**
- {{to_name}} - Recipient's name
- {{to_email}} - Recipient's email
- {{from_name}} - Your name
- {{from_email}} - Your email
- {{original_subject}} - Original message subject
