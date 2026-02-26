export function parseMargin(marginStr) {
  if (!marginStr) return '';
  const parts = marginStr.trim().split(/\s+/);
  if (parts.length === 1) return `${parts[0]} ${parts[0]} ${parts[0]} ${parts[0]}`;
  if (parts.length === 2) return `${parts[0]} ${parts[1]} ${parts[0]} ${parts[1]}`;
  if (parts.length === 3) return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[1]}`;
  if (parts.length >= 4) return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`;
  return '';
}
