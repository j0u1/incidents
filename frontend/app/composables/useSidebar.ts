export function useSidebar() {
  const isOpen = useCookie<boolean>("sidebar-open", {
    default: () => true,
  });

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  return { isOpen, toggle };
}
