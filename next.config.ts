import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    domains: ['pub-xxx.r2.dev'],  // Cloudflare R2
    formats: ['image/avif', 'image/webp']
  },
  
  // Compression
  compress: true,
  
  // PWA headers
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000' }
      ]
    }
  ],
  
  // Bundle analysis
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  }
};

export default nextConfig;
