import { Layout, Users2, TriangleAlert, type LucideIcon, CircleDotIcon } from "@lucide/vue";
import { features } from "./features";

interface NavigationItem {
  title: string;
  path: string;
  icon: LucideIcon;
  feature?: keyof typeof features;
  exact?: boolean;
}

const pagesDashboardPath = "/dashboard";
const navigation: NavigationItem[] = [
  { title: "Обзор", path: pagesDashboardPath, icon: Layout, exact: true },
  {
    title: "Инциденты",
    path: `${pagesDashboardPath}/problems`,
    icon: TriangleAlert,
    feature: "problems",
  },
  {
    title: "Участники",
    path: `${pagesDashboardPath}/users`,
    icon: Users2,
    feature: "users",
  },
  // { title: "Аккаунт", path: "/account", icon: User2, feature: "auth" },
  {
    title: "Статусы",
    path: `${pagesDashboardPath}/statuses`,
    icon: CircleDotIcon,
    feature: "statuses",
  },
];
export const visibleNavigation = navigation.filter(
  (item) => !item.feature || features[item.feature],
);
