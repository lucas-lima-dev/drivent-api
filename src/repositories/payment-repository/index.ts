import { Enrollment } from '@prisma/client';
import { prisma } from '@/config';

async function findPaymentWithTicketId(ticketId: number): Promise<any> {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function checkOwnerByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
    select: { Ticket: { select: { Enrollment: true } } },
  });
}

// async function createPaymentWithTicketId(): Promise<any> {
//   return [];
// }

const paymentsRepository = {
  findPaymentWithTicketId,
  checkOwnerByTicketId,
  //   createPaymentWithTicketId,
};

export default paymentsRepository;
