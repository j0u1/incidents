import type { Status } from "~/types/Status";

const statuses = ref<Status[]>([]);

export function useStatuses() {
  const api = useApi();

  const createStatus = async (name: string, color: string, description?: string) => {
    const status = await api("/api/statuses", {
      method: "POST",
      body: { name, description, color },
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

  const updateStatus = async (id: string, name?: string, color?: string, description?: string) => {
    const status = await api(`/api/statuses/${id}`, {
      method: "PATCH",
      body: { name, color, description },
    });
    return status;
  };

  return {
    statuses,
    createStatus,
    getStatuses,
    deleteStatus,
    updateStatus,
  };
}
