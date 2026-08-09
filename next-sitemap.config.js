/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://juansantiagoamarres.online",
  generateRobotsTxt: true,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
  },
};
