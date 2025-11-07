export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export const fmtDate = (iso: string) => {
  try {
    const d = new Date(iso);
    return d.toISOString().slice(0, 10);
  } catch {
    return iso;
  }
};
