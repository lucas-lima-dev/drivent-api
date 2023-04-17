import { Enrollment, TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

async function findPaymentWithTicketId(ticketId: number): Promise<any> {
  return await prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function checkOwnerByTicketId(ticketId: number) {
  return await prisma.payment.findFirst({
    where: { ticketId },
    select: { Ticket: { select: { Enrollment: true } } },
  });
}

async function finishPayment(ticketId: number, paymentObj: any): Promise<any> {
  return await prisma.$transaction([
    prisma.payment.create({
      data: {
        ticketId,
        ...paymentObj,
      },
    }),
    prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        status: TicketStatus.PAID,
      },
    }),
  ]);
}

const paymentsRepository = {
  findPaymentWithTicketId,
  checkOwnerByTicketId,
  finishPayment,
};

export default paymentsRepository;
