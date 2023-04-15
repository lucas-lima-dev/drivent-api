import { Enrollment, Ticket } from '@prisma/client';
import { prisma } from '@/config';

async function getAllTickets() {
  return prisma.ticketType.findMany();
}

async function findTicket(enrollmentId: number): Promise<any> {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

async function create(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      status: 'RESERVED',
      ticketTypeId,
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketsRepository = {
  getAllTickets,
  findTicket,
  create,
};

export default ticketsRepository;
