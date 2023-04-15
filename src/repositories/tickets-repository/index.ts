import { Enrollment } from '@prisma/client';
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

// async function findAllTickets(): Promise<any> {
//   return [];
// }

// async function createNewTicket(): Promise<any> {
//   return [];
// }

const ticketsRepository = {
  getAllTickets,
  findTicket,
};

export default ticketsRepository;
