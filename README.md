# Hovertext Demo

An interactive kinetic-typography playground where text responds to your cursor with weight and color shifts.

## What It Does

Renders multiple scrolling text lines (or a single centered line) and lets you:

- Move the cursor to inflate character weight and brighten nearby letters
- Toggle between single-line and multi-line layouts
- Animate line tracks with a continuous marquee effect
- Adjust typography controls (font, size, tracking, line height, radius, strength)
- Change background and text colors in real time

## Quick Start

```bash
# Install dependencies
npm install

# Dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React** - UI framework
- **GSAP** - Animation library
- **Vite** - Build tool

## Project Structure

```text
src/
├── components/     # Breaker, Char, Cursor, ControlBar, ErrorBoundary
├── context/        # App context and hooks
├── hooks/          # Mouse position tracking
├── styles/         # Global CSS
├── config.js       # Control ranges and labels
└── App.jsx         # Main app
```
