# Modern Portfolio Website

A responsive and modern personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📱 Fully responsive design
- 🌓 Dark mode support
- 🎨 Modern UI with smooth animations
- 📊 Skills visualization
- 📝 Contact form with validation
- 🚀 Optimized performance
- ✨ SEO friendly
- 🖥️ Flexible server options (local, network, admin panel)

## Sections

- Hero Section with call-to-action
- About Me with education and background
- Skills categorized into Frontend, Backend, and Tools
- Projects showcase with links to live demo and GitHub
- Resume with download option
- Contact form with social links
- Footer with copyright and quick navigation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Server

The portfolio comes with a flexible server that can run in different modes:

#### Option 1: Use the interactive batch file (Windows)
```bash
# Run the interactive batch file and select your preferred mode
start-server.bat
```

#### Option 2: Use npm scripts
```bash
# Local mode (localhost only)
npm run server

# Network mode (accessible from other devices on your network)
npm run server:network

# Admin mode (includes admin panel on port 7001)
npm run server:admin

# All features (network access + admin panel)
npm run server:all
```

#### Server Features
- **Local Mode**: Runs on localhost:7000
- **Network Mode**: Accessible from other devices on your network
- **Admin Mode**: Provides access to the admin panel at /admin
- **Interactive Controls**:
  - `Ctrl+C`: Stop the server
  - `r+Enter`: Restart the server
  - `c+Enter`: Clear the console
  - `h+Enter`: Show help information

#### Admin Panel
When running with admin mode enabled, you can access the admin panel at:
```
http://localhost:7001/admin  # Local access
http://<your-ip>:7001/admin  # Network access (if using --network flag)
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

1. Replace placeholder content in components with your personal information
2. Add your own images in the `public` directory
3. Modify colors in `tailwind.config.js` to match your personal brand
4. Update projects in `ProjectsSection.tsx` with your own work
5. Replace `resume.pdf` with your actual resume

## Deployment

Deploy to Vercel:
```bash
npm run build
vercel --prod
```

Or deploy to Netlify, GitHub Pages, or any other hosting service that supports Next.js applications.

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons

## License

MIT

## Acknowledgements

- [NextJS](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/) 