import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTicketsByUser(userId: number): Promise<any> {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicket(enrollment.id);
  if (!ticket) throw notFoundError();

  return ticket;
}

const ticketsService = {
  getTicketsByUser,
};

export default ticketsService;
