const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // You may only need to add assetPrefix in the production.
  assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
  env: {
    localBasePath: isProd ? 'https://cdn.mydomain.com' : ''
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/p/hello-nextjs': { page: '/post', query: { title: 'Hello Next.js' } },
      '/p/learn-nextjs': { page: '/post', query: { title: 'Learn Next.js is awesome' } },
      '/p/deploy-nextjs': { page: '/post', query: { title: 'Deploy apps with Zeit' } },
      '/p/exporting-pages': { page: '/post', query: { title: 'Learn to Export HTML Pages' } }
    };
  }
};