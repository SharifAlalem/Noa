export function onClickOutside(element: Ref<boolean>, callback: () => void) {
  if (!process.client) return;

  const listener = (event: MouseEvent) => {
    if (element.value === false) return;
    
    // Check if the click was outside the menu
    const target = event.target as HTMLElement;
    const isOutside = !target.closest('.user-menu') && !target.closest('.profile-button');
    
    if (isOutside) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('click', listener);
  });

  onUnmounted(() => {
    document.removeEventListener('click', listener);
  });
}