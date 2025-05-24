# CAE Conference Website

A modern, responsive conference website for the Central Asian Economics (CAE) conference hosted by Nazarbayev University. Built with React, TypeScript, and TailwindCSS.

## Features

- Responsive design optimized for all device sizes
- Interactive navigation with mobile menu
- Multiple conference information pages:
  - Home page with key conference information
  - About Us with details about the organization
  - Schedule with interactive day selection
  - Speakers with keynote and session presenters
  - Location with venue details, travel information, and accommodation options
  - Sponsors & Partners showcasing conference supporters
  - Code of Conduct for attendees and participants

## Technologies Used

- **React 18**: Modern frontend library for building user interfaces
- **TypeScript**: Type-safe JavaScript for improved developer experience
- **React Router v7**: Routing and navigation between pages
- **TailwindCSS**: Utility-first CSS framework for fast, responsive design
- **Headless UI**: Accessible UI components for React applications
- **React Icons**: Popular icon sets as React components

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/cae-conference.git
cd cae-conference
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the website in your browser.

## Project Structure

```
cae-conference/
├── public/             # Public files (favicon, index.html, etc.)
├── src/                # Source files
│   ├── assets/         # Images and other assets
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   │   ├── Home.tsx    # Home page component
│   │   ├── AboutUs.tsx # About Us page component
│   │   └── ...         # Other page components
│   ├── App.tsx         # Main app component with routes
│   ├── index.tsx       # React entry point
│   └── index.css       # Global CSS including TailwindCSS
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── tailwind.config.js  # TailwindCSS configuration
```

## Customization

### Styling

The website uses TailwindCSS for styling. You can customize the theme by editing the `tailwind.config.js` file.

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1F4690',    // Dark blue - main brand color
        secondary: '#3A5BA0',  // Lighter blue - secondary color
        accent: '#FFA500',     // Orange - accent color
        background: '#F5F7FA', // Light gray - background color
      },
      // ... other customizations
    },
  },
};
```

### Content

Update the content in the respective page components under `src/pages/` to reflect your conference information.

## Deployment

Build the project for production:

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `build` folder that you can deploy to any static hosting service such as Netlify, Vercel, GitHub Pages, or AWS S3.

## License

MIT License

## Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Headless UI](https://headlessui.dev/)
- [React Icons](https://react-icons.github.io/react-icons/) 