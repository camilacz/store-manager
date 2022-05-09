const Joi = require('joi');
const handleError = require('../utils/handleError');
const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('../utils/statusCode');

const schema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validateProduct = (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = schema.validate({ name, quantity });

  if (error) {
    const { type, message } = error.details[0];
    const status = type.includes('required') ? BAD_REQUEST : UNPROCESSABLE_ENTITY;
    return next(handleError(status, message));
  }
  next();
};

module.exports = {
  validateProduct,
};