export function prettyTime(v: string): string {
  if (!v) return 'No time set';
  const [h0, m = '00'] = v.split(':');
  let h = parseInt(h0, 10);
  const suffix = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `Every day at ${h}:${m} ${suffix}`;
}
