interface Status {
  id: string;
  name: string;
  color: string;
  ticketsId: null;
}

const statuses = ref<Status[]>([]);

export function useStatuses() {
  const api = useApi();

  const createStatus = async (name: string, color: string) => {
    const status = await api("/api/statuses", {
      method: "POST",
      body: { name, color },
    });
    statuses.value = await getStatuses();
    return status;
  };

  const getStatuses = async () => {
    statuses.value = await api<Status[]>("/api/statuses");
    return statuses.value;
  };

  const deleteStatus = async (id: string) => {
    await api(`/api/statuses/${id}`, {
      method: "DELETE",
    });
    statuses.value = statuses.value.filter((s) => s.id !== id);
  };

  return {
    statuses,
    createStatus,
    getStatuses,
    deleteStatus,
  };
}
