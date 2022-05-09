const Joi = require('joi');
const handleError = require('../utils/handleError');
const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('../utils/statusCode');

const schema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const validateSale = (req, _res, next) => {
  const { productId, quantity } = req.body;

  const { error } = schema.validate({ productId, quantity });
  if (error) {
    const { type, message } = error.details[0];
    const status = type.includes('required') ? BAD_REQUEST : UNPROCESSABLE_ENTITY;
    return next(handleError(status, message));
  }

  next();
};

module.exports = {
  validateSale,
};
