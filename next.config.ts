import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF + WebP: máxima compresión sin sacrificar calidad.
    formats: ["image/avif", "image/webp"],
    // Permitimos calidad alta para las portadas de proyecto a pantalla completa.
    qualities: [75, 90],
  },
};

export default nextConfig;
