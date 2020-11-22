const dotenv = require('dotenv');

dotenv.config();
module.exports = () => ({
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: process.env.SENDGRID_API_KEY,
    },
    settings: {
      defaultFrom: 'tomas.dukynas@gmail.com',
      defaultReplyTo: 'tomas.dukynas@gmail.com',
    },
  },
});
