import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

async function getPaymentInfoFromTicketId(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
  const { ticketId } = req.query as { ticketId: string };

  try {
    const paymentInfo = await paymentsService.getPaymentInfoFromTicketId(parseInt(ticketId));
    return res.status(httpStatus.OK).send(paymentInfo);
  } catch (error) {
    next(error);
  }
}

// async function postCreatePaymentFromTicketId(req: AuthenticatedRequest, res: Response): Promise<any> {
//   return [];
// }

const paymentController = {
  getPaymentInfoFromTicketId,
};

export default paymentController;
