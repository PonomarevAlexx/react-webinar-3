export default function formatCommentTime(time) {
  const date = new Date(time);

  const optionsForDate = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const dateComment = date.toLocaleDateString('ru-Ru', optionsForDate);

  const optionsForTime = {
    hour: '2-digit',
    minute: '2-digit',
  };
  const timeComment = date.toLocaleTimeString('ru-Ru', optionsForTime);

  return `${dateComment} в ${timeComment}`
}
