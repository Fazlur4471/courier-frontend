/**
 * Format timestamp for display
 */
export function formatDateTime(value) {
  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

/**
 * Truncate long text (records table)
 */
export function truncate(text, length = 40) {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "…" : text;
}

/**
 * Print handler
 */
export function printPage() {
  window.print();
}
