import { notFoundError, unauthorizedError } from '@/errors';
import paymentsRepository from '@/repositories/payment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getPaymentInfoFromTicketId(ticketId: number): Promise<any> {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const checkTicketIdOwner = await paymentsRepository.checkOwnerByTicketId(ticketId);
  if (!checkTicketIdOwner) throw unauthorizedError();

  const paymentInfoByTicketId = await paymentsRepository.findPaymentWithTicketId(ticketId);
  if (!paymentInfoByTicketId) throw notFoundError();

  return paymentInfoByTicketId;
}

// async function createPaymentWithTicketId(): Promise<any> {
//   return [];
// }

const paymentsService = {
  getPaymentInfoFromTicketId,
  //   createPaymentWithTicketId,
};

export default paymentsService;
