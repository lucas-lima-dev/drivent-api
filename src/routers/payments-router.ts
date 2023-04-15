import { Router } from 'express';
import { authenticateToken, validateBody, validateQuery } from '@/middlewares';
import paymentController from '@/controllers/payments-controller';
import { ticketIdSchema } from '@/schemas/payments-schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', validateQuery(ticketIdSchema), paymentController.getPaymentInfoFromTicketId);
//   .post('/process', paymentController.);

export { paymentsRouter };
