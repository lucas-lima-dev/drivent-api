import Joi from 'joi';

export const ticketIdSchema = Joi.object({
  ticketId: Joi.string()
    .regex(/^[0-9]+$/)
    .required(),
});
