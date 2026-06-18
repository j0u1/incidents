import type { Ticket } from "~/types/ticket";

export const useTicketsStore = defineStore("tickets", () => {
  const api = useApi();
  const tickets = ref<Ticket[]>([]);
  const fetchUrl = "/api/tickets";

  const getTickets = async () => {
    tickets.value = await api<Ticket[]>(fetchUrl);
  };

  const getTicketById = async (id: string) => {
    return await api<Ticket>(`${fetchUrl}/${id}`);
  };

  const createTicket = async (title: string, description?: string, statusId?: string) => {
    const ticket = await api(fetchUrl, {
      method: "POST",
      body: { title, description, statusId },
    });
    await getTickets();

    return ticket;
  };

  const deleteTicket = async (id: string) => {
    await api(`${fetchUrl}/${id}`, {
      method: "DELETE",
    });
    tickets.value = tickets.value.filter((t) => t.id !== id);
  };

  const updateTicket = async (
    id: string,
    data: { title?: string; description?: string; statusId?: string },
  ) => {
    const ticket = await api(`${fetchUrl}/${id}`, {
      method: "PATCH",
      body: data,
    });

    return ticket;
  };
  return { tickets, getTickets, getTicketById, createTicket, deleteTicket, updateTicket };
});
