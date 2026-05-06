export function useTickets() {
interface Ticket {
  id: string
  title: string
  description: string | null
  date: string
  status: null | { id: string, name: string, color: string }
  category: { id: string, name: string, color: string }[]
  createdBy: null | { id: string, name: string, email: string, image: string | null }
  assigmentTo: null | { id: string, name: string, email: string, image: string | null }
}
  const api = useApi()

  const createTicket = async ( title: string, description?: string ) => {
    return await api("/api/tickets", {
      method: "POST",
      body: { title, description }
    })
  }

  const getTickets = async () => {
    return await api<Ticket[]>("/api/tickets")
  }

  return {
    createTicket,
    getTickets
  }
}