
export default function declination(num) {
  let n = num % 100;
  if (n >= 5 && n <= 20) {
    return `Выделяли ${num} раз`;
  }
  n %= 10;
  if (n === 1) {
    return `Выделяли ${num} раз`;
  }
  if (n >= 2 && n <= 4) {
    return `Выделяли ${num} раза`;
  }
}
