// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//     app.use('/auth/**', 
//         createProxyMiddleware({ 
//             target: 'http://localhost:5000'
//         })
//     );
// };

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // Define the target URL using an environment variable
    const frontendUri = process.env.SPOTIFY_FRONTEND_URI || 'https://spotify-top-items-18b9b4ba5a53.herokuapp.com';

    // Proxy requests to '/spotify' routes to the target URL
    app.use('/spotify/**', 
        createProxyMiddleware({ 
            target: frontendUri,
            changeOrigin: true // Needed for Heroku
        })
    );
};

