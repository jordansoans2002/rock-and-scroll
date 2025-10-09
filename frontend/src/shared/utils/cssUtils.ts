export const getCssVariable = (
  name: string,
  element: HTMLElement = document.documentElement,
  fallback = 0
): number => {
  const raw = getComputedStyle(element).getPropertyValue(name).trim();
  console.log("raw css variable value", name, raw)
  if (!raw) return fallback;
  const parsed = parseFloat(raw.replace("px", ""));
  return Number.isFinite(parsed) ? parsed : fallback;
};