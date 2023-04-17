import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

async function getPaymentInfoFromTicketId(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
  const { ticketId } = req.query as { ticketId: string };
  const { userId } = req;

  try {
    const paymentInfo = await paymentsService.getPaymentInfoFromTicketId(parseInt(ticketId), userId);
    return res.status(httpStatus.OK).send(paymentInfo);
  } catch (error) {
    next(error);
  }
}

async function finishPayment(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
  const paymentData = req.body;
  const { userId } = req;

  try {
    const paymentResponse = await paymentsService.finishPayment(paymentData, userId);
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
