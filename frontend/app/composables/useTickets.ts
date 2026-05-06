export function useTickets() {
  
  const api = useApi()

  const createTicket = async ( title: string, description?: string ) => {
    return await api("/api/tickets", {
      method: "POST",
      body: { title, description }
    })
  }

  const getTickets = async () => {
    return await api("/api/tickets")
  }

  return {
    createTicket,
    getTickets
  }
}