import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import ticketsController from '@/controllers/tickets-controller';
import { createTicketSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/', ticketsController.getTicketsByUser)
  .get('/types', ticketsController.getAllTickets)
  .post('/', validateBody(createTicketSchema), ticketsController.create);

export { ticketsRouter };
