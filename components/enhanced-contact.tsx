"use client"

import { useState, useCallback } from "react"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, MessageCircle, Send, CheckCircle, Download } from "lucide-react"
import { validateContactForm } from "@/lib/contact"
import { Button } from "@/components/ui/button"
import { sendContactEmail } from "@/lib/email-service"

interface ContactMethod {
  id: string
  name: string
  value: string
  icon: React.ReactNode
  href: string
  description: string
  color: string
}

const contactMethods: ContactMethod[] = [
  {
    id: "email",
    name: "Email",
    value: "Adisrivastav23@gmail.com",
    icon: <Mail className="w-5 h-5" />,
    href: "mailto:Adisrivastav23@gmail.com",
    description: "Send me an email for professional inquiries",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "github",
    name: "GitHub",
    value: "github.com/psyodrz",
    icon: <Github className="w-5 h-5" />,
    href: "https://github.com/psyodrz",
    description: "Check out my code and contributions",
    color: "from-gray-700 to-gray-900"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    value: "linkedin.com/in/adisrivastav23",
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://linkedin.com/in/adisrivastav23",
    description: "Connect with me professionally",
    color: "from-blue-600 to-blue-800"
  },
]

export function EnhancedContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("email")

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")
    
    try {
      // Validate form data
      const { isValid, errors } = validateContactForm(formData)
      
      if (!isValid) {
        setSubmitMessage(`Please fix the following errors:\n${errors.join('\n')}`)
        setIsSubmitting(false)
        return
      }
      
      // Send email using our email service
      const result = await sendContactEmail({
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'Adisrivastav23@gmail.com'
      })
      
      if (result.success) {
        setSubmitMessage(result.message)
        setIsSubmitted(true)
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setSubmitMessage("")
          setFormData({ name: "", email: "", subject: "", message: "" })
        }, 5000)
      } else {
        setSubmitMessage(result.message)
      }
      
      // Log for debugging
      console.log('Contact form result:', result)
      
      setIsSubmitting(false)
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitMessage('There was an error sending your message. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center sci-fi-card p-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold sci-fi-text mb-2" style={{ fontFamily: 'Times New Roman, serif' }}>Message Sent!</h3>
        <p className="sci-fi-muted" style={{ fontFamily: 'Poppins, sans-serif' }}>{submitMessage}</p>
        <p className="text-sm sci-fi-accent mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>You should also receive an auto-reply confirmation email.</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Methods */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold sci-fi-text mb-6" style={{ fontFamily: 'Times New Roman, serif' }}>Get In Touch</h3>
          
          <div className="grid gap-4">
            {contactMethods.map((method) => (
              <a
                key={method.id}
                href={method.href}
                target={method.id === "email" ? "_self" : "_blank"}
                rel={method.id === "email" ? "" : "noopener noreferrer"}
                className={`sci-fi-card p-6 group hover:scale-105 transition-all duration-300 ${
                  selectedMethod === method.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} text-white`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold sci-fi-text mb-1" style={{ fontFamily: 'Times New Roman, serif' }}>{method.name}</h4>
                    <p className="text-sm sci-fi-accent mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{method.value}</p>
                    <p className="text-xs sci-fi-muted" style={{ fontFamily: 'Poppins, sans-serif' }}>{method.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>


        {/* Contact Form */}
        <div className="sci-fi-card p-6">
          <h3 className="text-2xl font-bold sci-fi-text mb-6" style={{ fontFamily: 'Times New Roman, serif' }}>Send a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                 <label className="block text-sm font-medium sci-fi-muted mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                 <label className="block text-sm font-medium sci-fi-muted mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div>
               <label className="block text-sm font-medium sci-fi-muted mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="What's this about?"
              />
            </div>
            
            <div>
               <label className="block text-sm font-medium sci-fi-muted mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Tell me about your project or inquiry..."
              />
            </div>
            
            {/* Error/Success Message */}
            {submitMessage && !isSubmitted && (
              <div className={`p-3 rounded-lg text-sm ${
                submitMessage.includes('error') || submitMessage.includes('fix') 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                  : 'bg-green-500/10 text-green-400 border border-green-500/20'
              }`}>
                {submitMessage}
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending Message...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
