export function getYear(): number {
  return new Date().getFullYear();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;

  return `${day} ${month}, at ${formattedHours}:${formattedMinutes} ${ampm}`;
}