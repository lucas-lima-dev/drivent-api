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

async function finishPayment(_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
  const paymentInfo = _req.body;

  try {
    const paymentResponse = await paymentsService.finishPayment(paymentInfo);
    return res.status(httpStatus.OK).send(paymentResponse[0]);
  } catch (error) {
    next(error);
  }
}

const paymentController = {
  getPaymentInfoFromTicketId,
  finishPayment,
};

export default paymentController;
