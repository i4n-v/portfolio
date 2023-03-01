export default function debounce(callback: () => void, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null;

  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-ignore
      callback(...args);
      timer = null;
    }, delay);
  };
}
