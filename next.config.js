/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/nux-must-have-site',     // repository name
  assetPrefix: '/nux-must-have-site',
  trailingSlash: true,
};


export default nextConfig;
