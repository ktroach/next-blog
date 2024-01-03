// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require("next-contentlayer");

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import("./src/env.mjs")

/** @type {import("next").NextConfig} */
const nextConfig = {
  pageExtensions: ["tsx", "mdx", "ts", "js"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
    ],
  },
  experimental: {
    // TODO: Enable after fixing "Static Bail Out Caught" errors in production
    // ppr: true,
    esmExternals: "loose",
  },
  // Already doing linting and typechecking as separate tasks in CI
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
}

module.exports = withContentlayer(nextConfig)


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: ["uploadthing.com"],
//   },
//   experimental: {
//     serverActions: true,
//   },  
// };

// module.exports = withContentlayer(nextConfig);


// import { withContentlayer } from "next-contentlayer"


// /**
//  * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
//  * for Docker builds.
//  */
// await import("./src/env.js")

// /** @type {import("next").NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ["uploadthing.com"],
//   },
//   experimental: {
//     serverActions: true,
//   },
//   /** Linting and typechecking are already done as separate tasks in the CI pipeline */
//   // eslint: {
//   //   ignoreDuringBuilds: true,
//   // },
//   // typescript: {
//   //   ignoreBuildErrors: true,
//   // },
// }
// export default withContentlayer(nextConfig)
