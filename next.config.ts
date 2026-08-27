import type { NextConfig } from "next"

const configuredApiBaseUrl = (process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL)?.replace(/\/$/, "")

const nextConfig: NextConfig = {
  async rewrites() {
    if (!configuredApiBaseUrl) return []

    return [
      {
        source: "/api-proxy/article",
        destination: `${configuredApiBaseUrl}/article/`,
      },
      {
        source: "/api-proxy/:path*",
        destination: `${configuredApiBaseUrl}/:path*`,
      },
    ]
  },
}

export default nextConfig
