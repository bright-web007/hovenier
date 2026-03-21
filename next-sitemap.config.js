/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.hovenier.frl',
  generateRobotsTxt: false, // We have a custom robots.txt
  exclude: ['/staging/*', '/admin/*', '/api/*'],
  alternateRefs: [
    {
      href: 'https://www.hovenier.frl',
      hreflang: 'nl',
    },
    {
      href: 'https://www.hovenier.frl/en',
      hreflang: 'en',
    },
  ],
  transform: async (config, path) => {
    // Add hreflang for each page
    const alternateRefs = [];
    
    if (path.startsWith('/en/')) {
      alternateRefs.push({
        href: config.siteUrl + path.replace('/en/', '/'),
        hreflang: 'nl',
      });
      alternateRefs.push({
        href: config.siteUrl + path,
        hreflang: 'en',
      });
    } else {
      alternateRefs.push({
        href: config.siteUrl + path,
        hreflang: 'nl',
      });
      alternateRefs.push({
        href: config.siteUrl + '/en' + path,
        hreflang: 'en',
      });
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs,
    };
  },
};