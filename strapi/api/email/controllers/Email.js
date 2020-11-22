module.exports = {
  index: async (ctx) => {
    await strapi.plugins['email'].services.email.send({
      to: 'tomas.dukynas@gmail.com',
      from: 'tomas.dukynas@gmail.com',
      replyTo: 'tomas.dukynas@gmail.com',
      subject: 'Successful purchase',
      text: 'Thank you for buying',
    });
    ctx.send('Email sent');
  },
};
