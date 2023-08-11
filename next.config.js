// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require("next-contentlayer");


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["uploadthing.com"],
  },
  experimental: {
    serverActions: true,
  },  
};

module.exports = withContentlayer(nextConfig);


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
