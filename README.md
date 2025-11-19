# Portfolio Website

A modern, dark-themed portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Dark theme with elegant design
- Split layout with portrait image and content section
- Responsive design for mobile and desktop
- Modern UI with smooth transitions
- Header navigation with mobile menu

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   └── Header.tsx       # Header component with navigation
└── public/              # Static assets
```

## Customization

- Replace the placeholder image in `app/page.tsx` with your own portrait
- Update the content, name, and navigation items
- Modify colors in `tailwind.config.ts` to match your brand
- Add more pages by creating new routes in the `app` directory

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

