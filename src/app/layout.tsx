import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Orbitron, Exo_2, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import CustomCursor from '@/components/CustomCursor';
import AnimationProvider from '@/components/animations/AnimationProvider';

// Gaming-inspired heading font
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

// Modern, futuristic body font
const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo2',
  display: 'swap',
});

// Clean, readable font for longer text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Personal Portfolio',
  description: 'A portfolio website for a Computer Science student and developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth h-full" suppressHydrationWarning>
      <body className={`${orbitron.variable} ${exo2.variable} ${inter.variable} min-h-screen w-full font-body`}>
        <ThemeProvider>
          <AnimationProvider>
          {children}
          <CustomCursor />
          <Toaster position="bottom-right" />
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 