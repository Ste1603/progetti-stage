/* @type {import('next').NextConfig}
const nextConfig = {};


export default nextConfig; */
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Aggiungi una regola per gestire i file SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Ritorna la configurazione modificata
    return config;
  },

  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
