/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },

  // Ship less JS: only pull the icons/components actually used from big libs.
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "date-fns",
      "recharts",
      "@radix-ui/react-icons",
    ],
  },

  serverExternalPackages: ["pino", "thread-stream", "pino-pretty"],

  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      tap: false,
      tape: false,
      desm: false,
      fastbench: false,
      "pino-elasticsearch": false,
      "why-is-node-running": false,
    }
    config.module = config.module || {}
    config.module.rules = config.module.rules || []
    config.module.rules.push({
      test: /node_modules[/\\]thread-stream[/\\](test|bench\.js)/,
      use: "null-loader",
    })
    config.module.rules.push({
      test: /\.(test|spec)\.(js|mjs|ts|tsx)$/,
      use: "null-loader",
    })
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, net: false, tls: false, crypto: false, stream: false,
        http: false, https: false, zlib: false, path: false, os: false,
      }
    }
    return config
  },
}

export default nextConfig
