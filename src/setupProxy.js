const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // Define the target URL using an environment variable
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

    // Proxy requests to '/spotify' routes to the target URL
    app.use('/spotify/**', 
        createProxyMiddleware({ 
            target: redirectUri,
            changeOrigin: true // Needed for Heroku
        })
    );
};


