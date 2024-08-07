export const scrollCenter = (element: HTMLElement | null) => {
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
