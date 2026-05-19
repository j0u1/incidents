export interface Ticket {
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
