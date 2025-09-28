# Sci-Fi Portfolio

A modern, sci-fi themed portfolio website built with Next.js, featuring 3D animations, particle effects, and interactive elements.

## Features

- **3D Hero Section**: Interactive 3D scene with Three.js
- **Particle Background**: Dynamic particle system with tsparticles
- **Smooth Animations**: GSAP, AOS, and ScrollReveal animations
- **Contact Integration**: Direct email and WhatsApp integration (no database required)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Radix UI components with custom styling
- **Theme Support**: Dark/light mode with next-themes

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: GSAP, AOS, ScrollReveal, Framer Motion
- **UI Components**: Radix UI
- **Particles**: tsparticles
- **Icons**: Lucide React, React Icons

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Open [http://localhost:7000](http://localhost:7000)** in your browser.

## Contact Integration

The portfolio includes a contact form that redirects users to either:
- **Email**: Opens default email client with pre-filled message
- **WhatsApp**: Opens WhatsApp Web/App with pre-filled message

No backend or database is required - all contact handling is done client-side.

## Project Structure

```
sci-fi-portfolio/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── ui/                # Radix UI components
│   └── legacy/            # Migrated components from original project
├── data/                   # Static data files
├── lib/                    # Utility functions
├── models/                 # TypeScript interfaces
├── public/                 # Static assets
└── styles/                 # Global styles
```

## Customization

- Update contact information in `lib/contact.ts`
- Modify project data in `data/projects.json`
- Customize animations in `lib/animations.ts`
- Update styling in `app/globals.css`

## Deployment

The project is ready for deployment on Vercel, Netlify, or any other Next.js-compatible platform.

## Migration Notes

This project was migrated from the original portfolio with the following changes:
- Removed MongoDB dependencies
- Added email/WhatsApp contact integration
- Updated to use modern UI components
- Enhanced with 3D elements and animations
