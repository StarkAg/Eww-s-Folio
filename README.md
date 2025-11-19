# Ushika's Portfolio

A modern, creative portfolio website for Ushika Lunawat featuring top-tier animations, video backgrounds, and an elegant dark theme built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Animated Hero Section** - Stunning letter-by-letter text animations with smooth transitions
- **Video Background** - Auto-playing video with custom audio synchronization
- **Parallax Effects** - Smooth scroll-triggered animations and parallax scrolling
- **Creative Design** - Modern dark theme with elegant gradients and effects
- **Interactive Elements** - Hover effects, micro-interactions, and smooth transitions
- **Responsive Design** - Fully responsive layout for mobile and desktop
- **Performance Optimized** - Built with Next.js 14 for optimal performance

## 🚀 Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** Vercel

## 📦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/UshikaLunawat/eww-s-folio.git
cd eww-s-folio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── app/
│   ├── globals.css      # Global styles and Tailwind directives
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main homepage with animations
├── components/
│   ├── Header.tsx       # Animated header with navigation
│   └── VideoPlayer.tsx  # Video player component (if needed)
├── public/
│   ├── image2.jpeg      # Portrait image
│   ├── video.mp4        # Background video
│   └── *.mp3            # Audio files
└── ...
```

## 🎨 Customization

- **Update Name:** Change "Ushika Lunawat" in `components/Header.tsx` and `app/layout.tsx`
- **Modify Content:** Edit text content in `app/page.tsx`
- **Replace Media:** Update images and video in the `public/` folder
- **Custom Audio:** Add your audio file to `public/` and update the reference in `app/page.tsx`
- **Change Colors:** Modify color scheme in `tailwind.config.ts`

## 🌐 Deployment

The site is deployed on Vercel and accessible at:
- **Production:** [ushika.online](https://ushika.online)
- **Vercel URL:** Check Vercel dashboard for the latest deployment URL

To deploy:
```bash
npx vercel --prod
```

## 📝 License

This project is private and proprietary.

## 👤 Author

**Ushika Lunawat**
- Portfolio: [ushika.online](https://ushika.online)
- GitHub: [@UshikaLunawat](https://github.com/UshikaLunawat)

---

Built with ❤️ using Next.js and Framer Motion
