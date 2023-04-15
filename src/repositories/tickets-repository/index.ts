import { Enrollment } from '@prisma/client';
import { prisma } from '@/config';

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
  findTicket,
};

export default ticketsRepository;
