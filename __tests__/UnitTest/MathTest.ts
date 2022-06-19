import {track} from './Analytic';
export function MathTest(x: number, y: number) {
  track('name');
  return x + y;
}

export function isPalindrome(s) {
  const count = s.length - 1;
  if (count < 2) {
    return true;
  }

  for (let i = 0; i < (count + 1) / 2; ++i) {
    if (s[i] !== s[count - i]) {
      return false;
    }
  }
  return true;
}
