const Joi = require('joi');
const handleError = require('../utils/handleError');
const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('../utils/statusCode');

const schema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const validateSale = (req, _res, next) => {
  const productsSold = req.body;

  const itemsValidation = productsSold.map((item) => {
    const { productId, quantity } = item;
    return schema.validate({ productId, quantity });
  });

  const invalidData = itemsValidation.find((validation) => validation.error);
  if (invalidData) {
    const { type, message } = invalidData.error.details[0];
    const status = type.includes('required')
      ? BAD_REQUEST
      : UNPROCESSABLE_ENTITY;
    return next(handleError(status, message));
  }

  next();
};

module.exports = {
  validateSale,
};
