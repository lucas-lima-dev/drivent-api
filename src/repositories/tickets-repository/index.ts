import { Enrollment, Ticket } from '@prisma/client';
import { prisma } from '@/config';

async function getAllTickets() {
  return await prisma.ticketType.findMany();
}

async function findTicket(enrollmentId: number): Promise<any> {
  return await prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

async function findTicketById(ticketId: number) {
  return await prisma.ticket.findFirst({
    where: { id: ticketId },
  });
}

async function findTicketTypeById(ticketTypeId: number) {
  return await prisma.ticketType.findFirst({
    where: { id: ticketTypeId },
  });
}

async function create(enrollmentId: number, ticketTypeId: number) {
  return await prisma.ticket.create({
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

async function updateTicketStatusByTicketId(ticketId: number) {
  return await prisma.ticket.update({
    where: { id: ticketId },
    data: { status: 'PAID' },
  });
}

const ticketsRepository = {
  getAllTickets,
  findTicket,
  findTicketById,
  findTicketTypeById,
  create,
  updateTicketStatusByTicketId,
};

export default ticketsRepository;
