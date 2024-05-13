const express = require('express');
const request = require('request');
const dotenv = require('dotenv');

const port = process.env.PORT;

dotenv.config();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const spotify_redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

let access_token = '';
let refresh_token = '';
let token_expiry = 0;

const generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const app = express();

app.get('/auth/login', (req, res) => {
  const scope = "streaming user-read-email user-read-private user-top-read";
  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state
  });

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});

app.get('/auth/callback', (req, res) => {
  const code = req.query.code;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      refresh_token = body.refresh_token;
      token_expiry = Date.now() + (body.expires_in * 1000); 
      res.redirect('/');
    }
  });
});

app.get('/auth/token', (req, res) => {
  res.json({ access_token: access_token });
});

app.get('/auth/logout', (req, res) => {
  access_token = '';
  refresh_token = '';
  token_expiry = 0;
  res.redirect('https://accounts.spotify.com/logout');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});


// const express = require('express');
// const request = require('request');
// const dotenv = require('dotenv');

// const port = 5000;

// dotenv.config();

// const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
// const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
// const spotify_redirect_uri = 'http://localhost:3000/auth/callback';

// let access_token = '';
// let refresh_token = '';
// let token_expiry = 0;

// const generateRandomString = function(length) {
//   var text = '';
//   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };

// const app = express();

// app.get('/auth/login', (req, res) => {
//   const scope = "streaming user-read-email user-read-private user-top-read";
//   const state = generateRandomString(16);

//   const auth_query_parameters = new URLSearchParams({
//     response_type: "code",
//     client_id: spotify_client_id,
//     scope: scope,
//     redirect_uri: spotify_redirect_uri,
//     state: state
//   });

//   res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
// });

// app.get('/auth/callback', (req, res) => {
//   const code = req.query.code;

//   const authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     form: {
//       code: code,
//       redirect_uri: spotify_redirect_uri,
//       grant_type: 'authorization_code'
//     },
//     headers: {
//       'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     json: true
//   };

//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       access_token = body.access_token;
//       refresh_token = body.refresh_token;
//       token_expiry = Date.now() + (body.expires_in * 1000); // Convert seconds to milliseconds
//       res.redirect('/');
//     }
//   });
// });

// app.get('/auth/token', (req, res) => {
//   res.json({ access_token: access_token });
// });

// app.get('/auth/logout', (req, res) => {
//   access_token = '';
//   refresh_token = '';
//   token_expiry = 0;
//   res.redirect('https://accounts.spotify.com/logout');
// });

// // Middleware to check token expiry and refresh if needed
// app.use((req, res, next) => {
//   if (token_expiry > 0 && Date.now() >= token_expiry) {
//     request.post(
//       'https://accounts.spotify.com/api/token',
//       {
//         form: {
//           grant_type: 'refresh_token',
//           refresh_token: refresh_token,
//           client_id: spotify_client_id,
//           client_secret: spotify_client_secret
//         },
//         json: true
//       },
//       function(error, response, body) {
//         if (!error && response.statusCode === 200) {
//           access_token = body.access_token;
//           token_expiry = Date.now() + (body.expires_in * 1000); // Convert seconds to milliseconds
//           next();
//         } else {
//           res.status(401).json({ error: 'Unauthorized' });
//         }
//       }
//     );
//   } else {
//     next();
//   }
// });

// app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}`);
// });
