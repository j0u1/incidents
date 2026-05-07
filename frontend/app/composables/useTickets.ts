interface Ticket {
  id: string;
  number: number;
  title: string;
  description: string | null;
  date: string;
  status: null | { id: string; name: string; color: string };
  category: { id: string; name: string; color: string }[];
  createdBy: null | { id: string; name: string; email: string; image: string | null };
  assigmentTo: null | { id: string; name: string; email: string; image: string | null };
}

const tickets = ref<Ticket[]>([]);

export function useTickets() {
  const api = useApi();

  const createTicket = async (title: string, description?: string) => {
    const ticket = await api("/api/tickets", {
      method: "POST",
      body: { title, description },
    });
    tickets.value = await getTickets();
    return ticket;
  };

  const getTickets = async () => {
    tickets.value = await api<Ticket[]>("/api/tickets");
    return tickets.value;
  };

  const deleteTicket = async (id: string) => {
    await api(`api/tickets/${id}`, {
      method: "DELETE",
    });
    tickets.value = tickets.value.filter((t) => t.id !== id);
  };

  return {
    tickets,
    createTicket,
    getTickets,
    deleteTicket,
  };
}
