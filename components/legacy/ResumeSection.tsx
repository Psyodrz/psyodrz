'use client';

import { motion } from 'framer-motion';
import { FiDownload, FiEye } from 'react-icons/fi';

const ResumeSection = () => {
  return (
    <section id="resume" className="bg-white/70 dark:bg-transparent backdrop-blur-sm">
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Resume
        </motion.h2>

        <motion.div 
          className="max-w-2xl mx-auto text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Download my resume to learn more about my education, work experience, and skills.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/resume.pdf"
              download
              className="btn-primary flex items-center justify-center gap-2"
            >
              <FiDownload /> Download Resume
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center justify-center gap-2"
            >
              <FiEye /> View Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection; 