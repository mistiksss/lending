export function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top =
    id === "top" || id === "forma"
      ? 0
      : el.getBoundingClientRect().top + window.scrollY - 12;
  window.scrollTo({ top, behavior: "auto" });
}
