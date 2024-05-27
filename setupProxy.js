const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://stcvapp.blob.core.windows.net',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', 
      },
    })
  );
};
