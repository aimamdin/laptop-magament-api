import Joi from "joi";
import { password } from "./customValidation";

export const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    pass: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};