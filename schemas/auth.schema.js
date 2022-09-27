const Joi = require('joi');
const email = Joi.string().email();
const password = Joi.string();

const authSchema = Joi.object({
  email: email,
  password: password,
});

module.exports = { authSchema };
