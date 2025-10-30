# EdLight Initiative

This repository contains the EdLight Academy web application - an online educational platform for Haiti.

## Overview

EdLight Academy is a React-based educational platform providing video courses, quizzes, and learning materials aligned with Haiti's Ministry of Education (MENFP) curriculum standards.

## Project Structure

```
EdLight-Initiative/
├── src/                    # React application source code
│   ├── components/         # React components (Navbar, Footer, Quiz, etc.)
│   ├── pages/             # Page components (Home, Courses, Dashboard, etc.)
│   ├── services/          # API and Firebase services
│   ├── hooks/             # Custom React hooks
│   ├── contexts/          # React context providers
│   ├── utils/             # Utility functions (CSV parser, i18n, etc.)
│   └── config/            # Configuration files
├── api/                   # API endpoints
│   ├── oauth/             # OAuth authentication
│   ├── users/             # User management
│   ├── generate-quiz.js   # Quiz generation endpoint
│   └── proxy.js           # API proxy
├── public/                # Public assets and data
│   ├── assets/            # Images and static files
│   └── data/              # CSV data files (videos, quizzes, subjects)
├── scripts/               # Build and transformation scripts
└── firebase.json          # Firebase configuration

```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## Features

- **Video Courses**: Educational videos organized by subject (Chemistry, Physics, Math, Economics)
- **Interactive Quizzes**: Practice quizzes for each subject
- **User Authentication**: Google OAuth integration via Firebase
- **Progress Tracking**: Track learning progress and quiz results
- **Multilingual Support**: English and Haitian Creole interface

## Technologies

- **Frontend**: React 18, React Router, Zustand (state management)
- **Backend**: Firebase (Authentication, Firestore)
- **Build Tool**: Webpack 5
- **Styling**: CSS with PostCSS
- **Deployment**: Vercel

## Data

The application includes:
- 309+ educational videos across multiple subjects
- Quiz database with comprehensive questions
- Subject metadata and curriculum alignment
- User data management

See [DATA_MIGRATION_README.md](DATA_MIGRATION_README.md) for details on data structure and migration.

## Contributing

This is an educational initiative for Haiti. Contributions are welcome!

## License

Educational content based on Haiti MENFP national curriculum standards.

---
*EdLight Initiative - Education for Haiti*
