import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Ticket } from '@prisma/client';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getAllTickets(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
  try {
    const tickets = await ticketsService.getAllTickets();
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    next(error);
  }
}
async function getTicketsByUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const ticket = await ticketsService.getTicketsByUser(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    next(error);
  }
}

export async function create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
  const { ticketTypeId } = req.body as { ticketTypeId: number };
  const { userId } = req as { userId: number };

  try {
    const createdTicket = await ticketsService.create(ticketTypeId, userId);
    return res.status(httpStatus.CREATED).send(createdTicket);
  } catch (error) {
    next(error);
  }
}

const ticketsController = {
  getAllTickets,
  getTicketsByUser,
  create,
};

export default ticketsController;
