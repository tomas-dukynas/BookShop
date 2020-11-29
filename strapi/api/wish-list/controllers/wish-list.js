const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  async wishlist(ctx) {
    console.log(ctx.request);
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.wishlist.create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.email;
      entity = await strapi.services.wishlist.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.wishlist });
  },
};
