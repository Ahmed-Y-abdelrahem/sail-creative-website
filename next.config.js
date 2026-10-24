
/** @type {import('next').NextConfig} */

const redirectsMap = [
  // Main pages
  ["/about-5", "/about"],
  ["/contact-us", "/contact"],
  ["/portofolio", "/work"],

  // Services
  ["/branding", "/services/branding"],
  ["/marketing", "/services/marketing"],
  ["/media-production", "/services/media-production"],

  // Projects: direct slug matches
  ["/gerflor", "/work/gerflor"],
  ["/armadio", "/work/armadio"],
  ["/afya", "/work/afya"],

  // Projects: renamed slugs
  ["/city-school", "/work/the-city-school"],
  ["/luini", "/work/luini-bakery"],
  ["/chay-t", "/work/chayt"],
  ["/bistro", "/work/bistro-catering"],
  ["/sumu", "/work/sumou"],
  ["/namar", "/work/namar-door"],
  ["/beut-alm", "/work/beut-almisk"],
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [420, 640, 828, 1080, 1440, 1920, 2560],
  },

  async redirects() {
    return redirectsMap.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },

  async headers() {
    return [
      {
        source: "/(work|partners|brand|textures)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
