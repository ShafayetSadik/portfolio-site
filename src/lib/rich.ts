// Escapes HTML, then turns **text** into <strong>text</strong>.
export function rich(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

// Prefixes a public/ path with the configured base URL.
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
