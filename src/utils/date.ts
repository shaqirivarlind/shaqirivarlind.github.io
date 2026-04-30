import dayjs from "dayjs";

export function formatYearMonth(ym: string): string {
  return dayjs(ym).format("MMM YYYY");
}

export function formatDuration(start: string, end?: string | null): string {
  const startDate = dayjs(start);
  const endDate = end ? dayjs(end) : dayjs();
  const totalMonths = endDate.diff(startDate, "month");
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);

  return parts.join(" ");
}
