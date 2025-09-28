"use client"

import { memo } from "react"
import { Calendar, MapPin, Building, Award } from "lucide-react"

interface TimelineItem {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string
  type: 'education' | 'experience' | 'achievement'
  skills: string[]
}

const timelineData: TimelineItem[] = [
  {
    id: "education-1",
    title: "Bachelor of Technology in Computer Science",
    company: "Maharishi University of Information Technology",
    location: "Uttar Pradesh, India",
    period: "2023 - 2027",
    description: "Pursuing comprehensive computer science education with focus on software development, algorithms, and system design.",
    type: 'education',
    skills: ["Data Structures", "Algorithms", "Database Management", "Software Engineering"]
  },
  {
    id: "achievement-1",
    title: "Hackathon Winner",
    company: "TechFest 2024",
    location: "Virtual",
    period: "March 2024",
    description: "Won first place in a 48-hour hackathon for developing an innovative AI-powered productivity tool.",
    type: 'achievement',
    skills: ["React", "Node.js", "OpenAI API", "Team Leadership"]
  },
  {
    id: "experience-1",
    title: "Frontend Developer Intern",
    company: "TechStart Solutions",
    location: "Remote",
    period: "Summer 2024",
    description: "Developed responsive web applications and contributed to the company's design system.",
    type: 'experience',
    skills: ["React", "TypeScript", "Tailwind CSS", "Figma"]
  }
]

export const TimelineSection = memo(function TimelineSection() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'education':
        return <Award className="w-5 h-5 text-primary" />
      case 'experience':
        return <Building className="w-5 h-5 text-secondary" />
      case 'achievement':
        return <Award className="w-5 h-5 text-accent" />
      default:
        return <Calendar className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'border-primary/30 bg-primary/5'
      case 'experience':
        return 'border-secondary/30 bg-secondary/5'
      case 'achievement':
        return 'border-accent/30 bg-accent/5'
      default:
        return 'border-border/30 bg-card/50'
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />
        
        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <div key={item.id} className="relative flex items-start gap-6">
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                {getIcon(item.type)}
              </div>
              
              {/* Content card */}
              <div className={`flex-1 sci-fi-card p-6 ${getTypeColor(item.type)} transition-all duration-300 hover:scale-[1.02]`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h3 className="text-lg font-semibold hollow-font-accent">{item.title}</h3>
                  <span className="text-sm sci-fi-muted flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {item.period}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium sci-fi-accent">{item.company}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm sci-fi-muted">{item.location}</span>
                </div>
                
                <p className="text-sm sci-fi-muted mb-4 leading-relaxed">{item.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 text-xs bg-card/60 text-foreground/80 rounded-md border border-border/50">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
