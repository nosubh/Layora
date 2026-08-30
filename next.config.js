/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Placeholder product photos ship as local SVGs so the store looks
    // finished before you add your own JPG/PNG photos. Safe because these
    // files are bundled with the project, not uploaded by strangers.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
