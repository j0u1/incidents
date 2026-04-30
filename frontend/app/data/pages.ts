import { Layout, Users2, TriangleAlert, User2 } from "@lucide/vue";

const pagesDashboardPath = "/dashboard";

export const pages = [
  { title: "Обзор", path: pagesDashboardPath, icon: Layout },
  {
    title: "Проблемы",
    path: `${pagesDashboardPath}/problems`,
    icon: TriangleAlert,
  },
  { title: "Участники", path: `${pagesDashboardPath}/users`, icon: Users2 },
  { title: "Аккаунт", path: "/account", icon: User2 },
];
