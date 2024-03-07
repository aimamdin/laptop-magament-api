import Joi from "joi";
export const createLaptop = {
  body: Joi.object().keys({
    brand: Joi.string().required(),
    model: Joi.string().required(),
    price: Joi.number().integer().required(),
    specs: Joi.object()
      .keys({
        screenSize: Joi.string().required(),
        processor: Joi.string().required(),
        ram: Joi.string().required(),
        storage: Joi.string().required(),
      })
      .required(),
  }),
};
