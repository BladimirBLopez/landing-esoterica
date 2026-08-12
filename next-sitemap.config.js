/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.juansantiagoamarres.online",
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
