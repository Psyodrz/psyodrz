"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Camera, Download, Share2, Code, Cpu, Database, Globe, Zap, GitBranch, Layers, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProfilePhotoSectionProps {
  className?: string
}

export function ProfilePhotoSection({ className = "" }: ProfilePhotoSectionProps) {
  const [imageError, setImageError] = useState(false)
  
  // Define floating bubble data with proper spacing to avoid overlaps
  const floatingBubbles = [
    {
      id: 'cs',
      content: 'CS',
      position: { top: '-12%', right: '-12%' },
      size: 'w-12 h-12 sm:w-14 sm:h-14',
      gradient: 'from-[#5227FF] to-[#FF9FFC]',
      animation: { y: [0, -8, 0], rotate: [0, 3, 0] },
      duration: 4,
      delay: 0,
      textSize: 'text-sm sm:text-base',
      fontFamily: 'Times New Roman, serif'
    },
    {
      id: 'ai',
      content: 'AI',
      position: { bottom: '-12%', left: '-12%' },
      size: 'w-10 h-10 sm:w-12 sm:h-12',
      gradient: 'from-[#FF9FFC] to-[#B19EEF]',
      animation: { y: [0, 6, 0], rotate: [0, -3, 0] },
      duration: 5,
      delay: 1,
      textSize: 'text-xs sm:text-sm',
      fontFamily: 'Times New Roman, serif'
    },
    {
      id: 'web',
      content: <Globe className="w-4 h-4" />,
      position: { top: '10%', left: '-18%' },
      size: 'w-8 h-8 sm:w-10 sm:h-10',
      gradient: 'from-[#B19EEF] to-[#5227FF]',
      animation: { y: [0, -5, 0], rotate: [0, 5, 0] },
      duration: 3.5,
      delay: 0.5,
      textSize: '',
      fontFamily: 'Poppins, sans-serif'
    },
    {
      id: 'code',
      content: <Code className="w-3 h-3" />,
      position: { top: '65%', right: '-20%' },
      size: 'w-6 h-6 sm:w-8 sm:h-8',
      gradient: 'from-[#FF9FFC] to-[#B19EEF]',
      animation: { y: [0, 4, 0], rotate: [0, -4, 0] },
      duration: 4.5,
      delay: 1.5,
      textSize: '',
      fontFamily: 'Poppins, sans-serif'
    },
    {
      id: 'cpu',
      content: <Cpu className="w-3 h-3" />,
      position: { bottom: '15%', right: '-8%' },
      size: 'w-7 h-7 sm:w-9 sm:h-9',
      gradient: 'from-[#5227FF] to-[#B19EEF]',
      animation: { y: [0, -6, 0], rotate: [0, 6, 0] },
      duration: 3.8,
      delay: 2,
      textSize: '',
      fontFamily: 'Poppins, sans-serif'
    },
    {
      id: 'db',
      content: <Database className="w-3 h-3" />,
      position: { top: '35%', left: '-22%' },
      size: 'w-6 h-6 sm:w-8 sm:h-8',
      gradient: 'from-[#B19EEF] to-[#FF9FFC]',
      animation: { y: [0, 5, 0], rotate: [0, -5, 0] },
      duration: 4.2,
      delay: 0.8,
      textSize: '',
      fontFamily: 'Poppins, sans-serif'
    },
    {
      id: 'zap',
      content: <Zap className="w-3 h-3" />,
      position: { bottom: '50%', left: '-8%' },
      size: 'w-5 h-5 sm:w-7 sm:h-7',
      gradient: 'from-[#FF9FFC] to-[#5227FF]',
      animation: { y: [0, -4, 0], rotate: [0, 4, 0] },
      duration: 3.2,
      delay: 1.2,
      textSize: '',
      fontFamily: 'Poppins, sans-serif'
    },
    {
      id: 'git',
      content: <GitBranch className="w-3 h-3" />,
      position: { top: '85%', left: '-15%' },
      size: 'w-6 h-6 sm:w-8 sm:h-8',
      gradient: 'from-[#5227FF] to-[#FF9FFC]',
      animation: { y: [0, 3, 0], rotate: [0, -3, 0] },
      duration: 4.8,
      delay: 2.5,
      textSize: '',
      fontFamily: 'Poppins, sans-serif'
    },
    {
      id: 'layers',
      content: <Layers className="w-3 h-3" />,
      position: { top: '20%', right: '-25%' },
      size: 'w-5 h-5 sm:w-7 sm:h-7',
      gradient: 'from-[#B19EEF] to-[#5227FF]',
      animation: { y: [0, -3, 0], rotate: [0, 3, 0] },
      duration: 3.6,
      delay: 1.8,
      textSize: '',
      fontFamily: 'Poppins, sans-serif'
    }
  ]

  return (
    <div className={`profile-photo-section relative group profile-photo-container ${className}`}>
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mx-auto mb-8 mt-4 sm:mt-6 md:mt-8">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B19EEF] rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
        
        {/* Main photo container */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-500">
          {!imageError ? (
            <Image
              src="/randi.png"
              alt="Aditya Srivastava - Computer Science Engineer"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
              quality={85}
              unoptimized={true}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#5227FF] to-[#FF9FFC] flex items-center justify-center">
              <User className="w-16 h-16 sm:w-20 sm:h-20 text-white opacity-80" />
            </div>
          )}
          
          {/* Overlay effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Camera icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Floating bubbles - positioned around the profile picture with proper spacing */}
        {floatingBubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            animate={bubble.animation}
            transition={{ 
              duration: bubble.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bubble.delay
            }}
            className={`absolute ${bubble.size} bg-gradient-to-r ${bubble.gradient} rounded-full flex items-center justify-center text-white font-bold ${bubble.textSize} shadow-lg z-10 hover:scale-110 transition-transform duration-200`}
            style={{
              ...bubble.position,
              fontFamily: bubble.fontFamily
            }}
          >
            {bubble.content}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
