export default function declination(num, option1, option2, option3) {
  let n = num % 100;
  if (n >= 5 && n <= 20) {
    return ` ${num} ${option3}`;
  }
  n %= 10;
  if (n === 1) {
    return ` ${num} ${option1}`;
  }
  if (n >= 2 && n <= 4) {
    return ` ${num} ${option2}`;
  }

  return ` ${num} ${option1}`
}
