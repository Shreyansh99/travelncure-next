/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://travelncure.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin", "/dashboard"], // exclude internal routes if any
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin", "/dashboard"] },
    ],
  },
};
