export const useSidebarStore = defineStore("sidebar", () => {
  const isOpen = useCookie<boolean>("sidebar-open", {
    default: () => true,
  });

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  return { isOpen, toggle };
});
