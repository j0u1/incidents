export interface Settings {
  defaultStatusId: string | null;
  defaultStatus: {
    id: string;
    name: string;
    color: string;
  } | null;
}