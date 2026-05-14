import type { Ticket } from "~/types/Ticket";

const tickets = ref<Ticket[]>([]);

export function useTickets() {
  const api = useApi();

  const createTicket = async (title: string, description?: string, statusId?: string) => {
    const ticket = await api("/api/tickets", {
      method: "POST",
      body: { title, description, statusId },
    });
    tickets.value = await getTickets();
    return ticket;
  };

  const getTickets = async () => {
    tickets.value = await api<Ticket[]>("/api/tickets");
    return tickets.value;
  };

  const getTicketById = async (id: string) => {
    return await api<Ticket>(`/api/tickets/${id}`);
  };

  const deleteTicket = async (id: string) => {
    await api(`/api/tickets/${id}`, {
      method: "DELETE",
    });
    tickets.value = tickets.value.filter((t) => t.id !== id);
  };

  const updateTicket = async (
    id: string,
    data: { title?: string; description?: string; statusId?: string },
  ) => {
    const ticket = await api(`/api/tickets/${id}`, {
      method: "PATCH",
      body: data,
    });

    return ticket;
  };

  return {
    tickets,
    createTicket,
    getTickets,
    deleteTicket,
    getTicketById,
    updateTicket,
  };
}
