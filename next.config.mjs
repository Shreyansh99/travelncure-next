/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     domains: ['cdn.apollohospitals.com', 'rawahealth.com', 'yapita-production.s3.ap-south-1.amazonaws.com'],
    // },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.apollohospitals.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'rawahealth.com',
            pathname: '**',
          },
          {
              protocol: 'https',
              hostname: 'yapita-production.s3.ap-south-1.amazonaws.com',
              pathname: '**',
          }
        ],
      },
};

export default nextConfig;
