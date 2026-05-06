export function useTickets() {
  const createTicket = async(title: string, description: string) => {
    const config = useRuntimeConfig();
    const data = await $fetch("api/tickets", {
      method: "POST",
      baseURL: config.public.authBaseURL,
      credentials: "include",
      body: { title, description }
    })
    return data
  }

  const getTickets = async () => {
    const config = useRuntimeConfig();
    const data = await $fetch("api/tickets", {
      baseURL: config.public.authBaseURL,
      credentials: "include"
    })
    return data
  }

  return { createTicket, getTickets }
}