module.exports = {
    origin: process.env.ORIGIN
};

// app/config/cors.config.js
const allowedOrigins = [
    "http://192.168.1.112:3000", // your frontend URL
    "http://localhost:3000" // local testing
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  };
  
  module.exports = corsOptions;
  