"use client"

import { useState, useMemo } from "react"
import { Code, Palette, Database, Cloud, Smartphone, Gamepad2 } from "lucide-react"

interface SkillCategory {
  id: string
  name: string
  icon: React.ReactNode
  skills: {
    name: string
    level: number
    description: string
  }[]
  color: string
}

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    icon: <Code className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React/Next.js", level: 90, description: "Advanced proficiency in React ecosystem" },
      { name: "TypeScript", level: 85, description: "Strong typing and modern JavaScript" },
      { name: "Tailwind CSS", level: 95, description: "Expert-level utility-first CSS" },
      { name: "Three.js", level: 75, description: "3D graphics and animations" },
      { name: "Framer Motion", level: 80, description: "Advanced animations and transitions" }
    ]
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: <Database className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 85, description: "Server-side JavaScript development" },
      { name: "Python/Django", level: 80, description: "Web frameworks and APIs" },
      { name: "MongoDB", level: 75, description: "NoSQL database management" },
      { name: "PostgreSQL", level: 70, description: "Relational database design" },
      { name: "REST APIs", level: 90, description: "API design and development" }
    ]
  },
  {
    id: "design",
    name: "UI/UX Design",
    icon: <Palette className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Figma", level: 85, description: "Interface design and prototyping" },
      { name: "Adobe Creative Suite", level: 70, description: "Graphic design tools" },
      { name: "Design Systems", level: 80, description: "Component-based design" },
      { name: "User Research", level: 65, description: "User-centered design approach" },
      { name: "Accessibility", level: 75, description: "WCAG compliance and inclusive design" }
    ]
  },
  {
    id: "mobile",
    name: "Mobile Development",
    icon: <Smartphone className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "React Native", level: 70, description: "Cross-platform mobile apps" },
      { name: "Expo", level: 75, description: "Rapid mobile development" },
      { name: "Flutter", level: 60, description: "Dart-based mobile development" },
      { name: "PWA", level: 85, description: "Progressive Web Applications" }
    ]
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: <Cloud className="w-6 h-6" />,
    color: "from-indigo-500 to-blue-500",
    skills: [
      { name: "AWS", level: 70, description: "Amazon Web Services" },
      { name: "Vercel", level: 90, description: "Frontend deployment and hosting" },
      { name: "Docker", level: 75, description: "Containerization" },
      { name: "Git/GitHub", level: 95, description: "Version control and collaboration" },
      { name: "CI/CD", level: 65, description: "Continuous integration and deployment" }
    ]
  },
  {
    id: "gamedev",
    name: "Game Development",
    icon: <Gamepad2 className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500",
    skills: [
      { name: "Unity", level: 80, description: "3D game development" },
      { name: "C#", level: 75, description: "Game programming language" },
      { name: "WebGL", level: 70, description: "Browser-based 3D graphics" },
      { name: "Game Design", level: 65, description: "Game mechanics and level design" }
    ]
  }
]

export function SkillsShowcase() {
  const [activeCategory, setActiveCategory] = useState("frontend")

  const activeSkills = useMemo(() => 
    skillCategories.find(cat => cat.id === activeCategory)?.skills || [],
    [activeCategory]
  )

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {skillCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-card/60 text-foreground/70 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            {category.icon}
            <span className="text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeSkills.map((skill) => (
          <div key={skill.name} className="sci-fi-card p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold hollow-font-accent" style={{ fontFamily: 'Times New Roman, serif' }}>{skill.name}</h4>
              <span className="text-sm sci-fi-accent font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>{skill.level}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-card/30 rounded-full h-2 mb-3 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${skillCategories.find(cat => cat.id === activeCategory)?.color} transition-all duration-1000 ease-out`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
            
            <p className="text-sm sci-fi-muted leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>{skill.description}</p>
          </div>
        ))}
      </div>

      {/* Skills Summary */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {skillCategories.map((category) => {
          const avgLevel = Math.round(
            category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length
          )
          return (
            <div key={category.id} className="text-center sci-fi-card p-4">
              <div className="mb-2">{category.icon}</div>
              <h5 className="text-sm font-medium sci-fi-text mb-1" style={{ fontFamily: 'Times New Roman, serif' }}>{category.name}</h5>
              <div className="text-2xl font-bold sci-fi-accent" style={{ fontFamily: 'Poppins, sans-serif' }}>{avgLevel}%</div>
              <div className="text-xs sci-fi-muted" style={{ fontFamily: 'Poppins, sans-serif' }}>Average</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
