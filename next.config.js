/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keeping this minimal deliberately. We will add settings here later
  // (e.g. image domains, if audio/image files are hosted externally)
  // only when we actually need them - avoiding unnecessary configuration.
  reactStrictMode: true,
};

module.exports = nextConfig;
