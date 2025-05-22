/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: [
    'mongodb',
    'mongoose',
    'bcryptjs',
    '@napi-rs/snappy',
    'snappy',
    'mongodb-client-encryption',
    'aws4',
    '@mongodb-js/zstd',
    'kerberos',
    'supports-color'
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't attempt to resolve these modules on the client
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        dns: false,
        'mongodb-client-encryption': false,
        'aws4': false,
        'snappy': false,
        '@mongodb-js/zstd': false,
        'kerberos': false,
        'supports-color': false,
        'util/types': false,
        'crypto': false,
        'stream': false,
        'buffer': false,
        'http': false,
        'url': false,
        'zlib': false,
        'path': false,
        'os': false,
        'child_process': false,
        'timers/promises': false,
        'mongodb': false,
        '@napi-rs/snappy': false,
        '@napi-rs/snappy-linux-x64-gnu': false,
        '@napi-rs/snappy-linux-x64-musl': false,
      }
      
      // Add rule to avoid including binary modules on the client
      config.module.rules.push({
        test: /\.node$/,
        use: 'null-loader',
      });
    }
    
    return config
  },
}

export default nextConfig
