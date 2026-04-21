import { Layout, Users2, TriangleAlert } from "@lucide/vue";

const pagesDashboardPath = "/dashboard";

export const pages = [
    { title: "Обзор", path: pagesDashboardPath, icon: Layout },
    { title: "Проблемы", path: `${pagesDashboardPath}/problems`, icon: TriangleAlert },
    { title: "Участники", path: `${pagesDashboardPath}/users`, icon: Users2 },
];
