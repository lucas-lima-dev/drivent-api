import { Ticket } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getAllTickets() {
  const tickets = await ticketsRepository.getAllTickets();
  if (!tickets) throw notFoundError();

  return tickets;
}

async function getTicketsByUser(userId: number): Promise<any> {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicket(enrollment.id);
  if (!ticket) throw notFoundError();

  return ticket;
}

async function create(ticketTypeId: number, userId: number) {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const createdTicket = await ticketsRepository.create(enrollment.id, ticketTypeId);
  if (!createdTicket) throw notFoundError();

  return createdTicket;
}

const ticketsService = {
  getAllTickets,
  getTicketsByUser,
  create,
};

export default ticketsService;
