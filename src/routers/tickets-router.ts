import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import ticketsController from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/', ticketsController.getTicketsByUser)
  .get('/types', ticketsController.getAllTickets);
//   .post('/', postCreateNewTicket);

export { ticketsRouter };
