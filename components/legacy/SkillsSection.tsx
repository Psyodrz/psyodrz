'use client';

import { motion } from 'framer-motion';
import { FiCode, FiServer, FiTool } from 'react-icons/fi';
import Waves from './Waves/Waves';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const SkillsSection = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <FiCode className="text-primary" size={24} />,
      skills: [
        { name: 'HTML/CSS', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'React', level: 50 },
        { name: 'Next.js', level: 75 },
        { name: 'Tailwind CSS', level: 90 },
      ],
    },
    {
      title: 'Backend',
      icon: <FiServer className="text-primary" size={24} />,
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Express', level: 75 },
        { name: 'Python', level: 85 },
        { name: 'Django', level: 65 },
        { name: 'MongoDB', level: 70 },
        { name: 'MySQL', level: 75 },
      ],
    },
    {
      title: 'Tools & Others',
      icon: <FiTool className="text-primary" size={24} />,
      skills: [
        { name: 'Git', level: 85 },
        { name: 'Docker', level: 70 },
        { name: 'AWS', level: 60 },
        { name: 'Firebase', level: 75 },
        { name: 'VS Code', level: 95 },
        { name: 'Figma', level: 70 },
      ],
    },
  ];

  return (
    <section id="skills" className="bg-white dark:bg-dark relative overflow-hidden">
      {/* Wave Effects */}
      <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden">
        <Waves 
          lineColor={mounted && theme === 'dark' ? "rgba(66, 135, 245, 0.3)" : "rgba(99, 102, 241, 0.25)"}
          waveSpeedX={0.012}
          waveSpeedY={0.008}
          waveAmpX={20}
          waveAmpY={10}
          xGap={30}
          yGap={40}
          className="waves"
        />
      </div>
      
      <div className="section-container relative z-20 py-16">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                {category.icon}
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 