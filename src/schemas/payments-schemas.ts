import Joi from 'joi';

export const ticketIdSchema = Joi.object({
  ticketId: Joi.string()
    .regex(/^[0-9]+$/)
    .required(),
});

type PaymentType = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

export const paymentSchema = Joi.object<PaymentType>({
  ticketId: Joi.number().required(),
  cardData: Joi.object().required(),
});
