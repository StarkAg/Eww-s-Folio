// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL = "https://ddoor.com";

const routes = {
  "/": true,
  "/about": true,
  "/products": true,
  "/brands": true,
  "/contact": true,
};

// Enable password protection on selected routes
// Set password in the .env file, refer to .env.example
const protectedRoutes = {};

import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const primaryFont = Geist({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

const monoFont = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const font = {
  primary: primaryFont,
  secondary: primaryFont,
  tertiary: primaryFont,
  code: monoFont,
};

const style = {
  theme: "light", // Using light theme for better product visibility
  neutral: "slate", // Using slate for a more premium feel
  brand: "moss", // Using moss (green) to represent stability and quality
  accent: "orange", // Using orange for warmth and wood tones
  solid: "contrast",
  solidStyle: "plastic", // Using plastic for a more modern look
  border: "conservative", // Using conservative for a more professional look
  surface: "filled", // Using filled for better product presentation
  transition: "all",
  scaling: "100"
};

const effects = {
  mask: {
    cursor: true,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: true,
    opacity: 90,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "accent-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: false,
  },
  grid: {
    display: false,
  },
  lines: {
    display: true,
    opacity: 20,
    color: "neutral-alpha-weak",
    size: "32",
    thickness: 1,
    angle: 45,
  },
};

const display = {
  location: true,
  time: false,
  themeSwitcher: true
};

const mailchimp = {
  action: "https://ddoor.us1.list-manage.com/subscribe/post?parameters",
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: false,
    },
    grid: {
      display: false,
    },
    lines: {
      display: true,
      opacity: 20,
      color: "neutral-alpha-medium",
      size: "32",
      thickness: 1,
      angle: 90,
    },
  },
};

export { routes, protectedRoutes, effects, style, display, mailchimp, baseURL, font };
