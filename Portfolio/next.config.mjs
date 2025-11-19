import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  // Limit Next.js file tracing to the project to avoid scanning the user home
  outputFileTracingRoot: "/Users/mrstark/Desktop/Files/Code PlayGround/My Creations/Stara_Webpage",
};

export default withMDX(nextConfig);
