export const formatDate = (pubDate: string): string => {
  const date = new Date(pubDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDuration = (duration: string): string => {
  const [hours, minutes] = duration.split(":");
  return `${hours}:${minutes}`;
};
