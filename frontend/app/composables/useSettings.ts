interface Settings {
  defaultStatusId: string | null;
  defaultStatus: {
    id: string;
    name: string;
    color: string;
  } | null;
}

export function useSettings() {
  const api = useApi();

  const getSettings = async () => {
    return await api<Settings>("/api/settings");
  };

  const updateSettings = async (data: { defaultStatusId: string | null }) => {
    return await api("/api/settings", {
      method: "PATCH",
      body: data,
    });
  };

  return { getSettings, updateSettings };
}
