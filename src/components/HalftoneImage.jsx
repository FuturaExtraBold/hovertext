import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { halftoneConfig } from "../halftoneConfig";

const {
  gridSize,
  maxDotSize,
  minDotSize,
  dotColor,
  brightnessMin,
  brightnessMax,
  animationDuration,
  animationEase,
} = halftoneConfig;

// Cache for preloaded images and their brightness data
const imageCache = new Map();

function sampleImageBrightness(img, cols, rows) {
  const canvas = document.createElement("canvas");
  canvas.width = cols * gridSize;
  canvas.height = rows * gridSize;
  const ctx = canvas.getContext("2d");

  // Draw image scaled to our grid dimensions
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const brightnessGrid = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let totalBrightness = 0;
      let pixelCount = 0;

      // Sample all pixels in this grid cell
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const px = col * gridSize + x;
          const py = row * gridSize + y;
          const idx = (py * canvas.width + px) * 4;

          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Skip transparent pixels
          if (a < 128) continue;

          // Grayscale brightness
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
          totalBrightness += brightness;
          pixelCount++;
        }
      }

      // Average brightness for this cell (0 if all transparent)
      const avgBrightness = pixelCount > 0 ? totalBrightness / pixelCount : 0;
      brightnessGrid.push(avgBrightness);
    }
  }

  return brightnessGrid;
}

function brightnessToRadius(brightness) {
  // Clamp brightness to our range
  const clamped = Math.max(brightnessMin, Math.min(brightnessMax, brightness));
  // Normalize to 0-1
  const normalized =
    (clamped - brightnessMin) / (brightnessMax - brightnessMin);
  // Map to dot radius (lighter = larger)
  return minDotSize / 2 + (normalized * (maxDotSize - minDotSize)) / 2;
}

export function HalftoneImage() {
  const { hoveredTeam } = useApp();
  const canvasRef = useRef(null);
  const dotRadiiRef = useRef([]);
  const gridDimensionsRef = useRef({ cols: 0, rows: 0 });
  const tweenRef = useRef(null);

  // Initialize grid dimensions based on viewport
  useEffect(() => {
    const updateDimensions = () => {
      const height = window.innerHeight;
      const width = Math.round(height * 0.6); // Approximate aspect ratio
      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      gridDimensionsRef.current = { cols, rows };

      // Initialize dot radii to 0
      const totalDots = cols * rows;
      if (dotRadiiRef.current.length !== totalDots) {
        dotRadiiRef.current = new Array(totalDots).fill(0);
      }

      // Update canvas size
      if (canvasRef.current) {
        canvasRef.current.width = cols * gridSize;
        canvasRef.current.height = rows * gridSize;
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Draw dots to canvas
  const drawDots = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const { cols, rows } = gridDimensionsRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = dotColor;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const idx = row * cols + col;
        const radius = dotRadiiRef.current[idx];

        if (radius > 0) {
          const cx = col * gridSize + gridSize / 2;
          const cy = row * gridSize + gridSize / 2;

          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };

  // Handle team hover changes
  useEffect(() => {
    const { cols, rows } = gridDimensionsRef.current;
    const totalDots = cols * rows;

    if (totalDots === 0) return;

    // Kill any existing tween
    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    const animateToRadii = (targetRadii) => {
      // Create a proxy object for GSAP to tween
      const proxy = { progress: 0 };
      const startRadii = [...dotRadiiRef.current];

      tweenRef.current = gsap.to(proxy, {
        progress: 1,
        duration: animationDuration,
        ease: animationEase,
        onUpdate: () => {
          const p = proxy.progress;
          for (let i = 0; i < totalDots; i++) {
            dotRadiiRef.current[i] =
              startRadii[i] + (targetRadii[i] - startRadii[i]) * p;
          }
          drawDots();
        },
      });
    };

    if (!hoveredTeam?.playerImage) {
      // Animate all dots to 0
      const targetRadii = new Array(totalDots).fill(0);
      animateToRadii(targetRadii);
      return;
    }

    const imageSrc = hoveredTeam.playerImage;

    // Check cache first
    if (imageCache.has(imageSrc)) {
      const brightnessGrid = imageCache.get(imageSrc);
      const targetRadii = brightnessGrid.map(brightnessToRadius);
      animateToRadii(targetRadii);
      return;
    }

    // Load and sample image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const brightnessGrid = sampleImageBrightness(img, cols, rows);
      imageCache.set(imageSrc, brightnessGrid);
      const targetRadii = brightnessGrid.map(brightnessToRadius);
      animateToRadii(targetRadii);
    };
    img.src = imageSrc;
  }, [hoveredTeam]);

  return <canvas ref={canvasRef} className="halftone-canvas" />;
}
