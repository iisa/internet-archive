export const dateParser = (dateStr) => {
  return (new Date(dateStr)).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};