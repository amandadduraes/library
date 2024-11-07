/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Garante que o site seja exportado como estático
  images: {
    unoptimized: true, // Desativa a otimização de imagens
  },
};

module.exports = nextConfig;