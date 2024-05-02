import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.devdojo.com",
      "cruip-tutorials.vercel.app",
      "images.pexels.com",
      "flowbite.s3.amazonaws.com",
      "images.ctfassets.net",
      "etimg.etb2bimg.com",
      "ngoshivam.org",
      "nojhanco.ir",
      "cdn.filestackcontent.com",
      "source.unsplash.com",
      "voltauto.ua"
    ],
  },
};

export default withNextIntl(nextConfig);
