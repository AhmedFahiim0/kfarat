import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kafaratplus-api-prod.tecfy.co",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
