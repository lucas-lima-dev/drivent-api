import { notFoundError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentsRepository from '@/repositories/payment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getPaymentInfoFromTicketId(ticketId: number, userId: number): Promise<any> {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findEnrollmentById(ticket.enrollmentId);

  if (enrollment.userId !== userId) throw unauthorizedError();

  // const checkTicketIdOwner = await paymentsRepository.checkOwnerByTicketId(ticketId);
  // if (!checkTicketIdOwner) throw unauthorizedError();

  const paymentInfoByTicketId = await paymentsRepository.findPaymentWithTicketId(ticketId);
  if (!paymentInfoByTicketId) throw notFoundError();

  return paymentInfoByTicketId;
}

async function finishPayment(paymentInfo: any, userId: number): Promise<any> {
  const { ticketId, cardData } = paymentInfo;

  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const ticketValue = await ticketsRepository.findTicketTypeById(ticket.ticketTypeId);
  if (!ticketValue) throw notFoundError();

  const enrollment = await enrollmentRepository.findEnrollmentById(ticket.enrollmentId);
  if (!enrollment) throw notFoundError();

  if (enrollment.userId !== userId) throw unauthorizedError();

  // const checkTicketIdOwner = await paymentsRepository.checkOwnerByTicketId(ticketId);
  // if (!checkTicketIdOwner) throw unauthorizedError();

  const paymentObj = {
    ticketId,
    value: ticketValue.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const paymentResponse = await paymentsRepository.finishPayment(ticketId, paymentObj);

  // await ticketsRepository.updateTicketStatusByTicketId(ticketId);

  return paymentResponse;
}

const paymentsService = {
  getPaymentInfoFromTicketId,
  finishPayment,
};

export default paymentsService;
