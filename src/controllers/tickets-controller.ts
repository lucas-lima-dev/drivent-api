import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

async function getTicketsByUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
  const { userId } = req;

  try {
    const ticket = await ticketsService.getTicketsByUser(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    next(error);
    // return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

const ticketsController = {
  getTicketsByUser,
};

export default ticketsController;
