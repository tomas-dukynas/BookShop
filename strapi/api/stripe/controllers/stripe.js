/**
 * A set of functions called "actions" for `stripe`
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const stripe = require('stripe')(
  'sk_test_51HlCOSLzMQ3V6wEcSgLq9uGfns5f1YAMh4kJOnY7WglvainTjlC0yUH6Pya65YX3FDZmKGT2MVqgUiIP6GMkMhKA00dcrOQmdt',
);

module.exports = {
  checkout: async (ctx) => {
    try {
      const { amount } = ctx.request.body;
      // console.log(ctx.request);
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });
      ctx.send(paymentIntent.client_secret);
    } catch (err) {
      ctx.throw(500);
    }
  },
  test: async (ctx) => {
    ctx.send('');
  },
};
