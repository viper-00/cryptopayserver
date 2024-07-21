import Big from 'big.js';

export function BigAdd(a: string, b: string): string {
  const num1 = new Big(a);
  const num2 = new Big(b);
  return num1.plus(num2).toString();
}

export function BigSub(a: string, b: string): string {
  const num1 = new Big(a);
  const num2 = new Big(b);
  return num1.minus(num2).toString();
}

export function BigMul(a: string, b: string): string {
  if (a === '0' || b === '0') {
    return '0';
  }

  const num1 = new Big(a);
  const num2 = new Big(b);
  return num1.times(num2).toString();
}

export function BigDiv(a: string, b: string): string {
  if (a === '0' || b === '0') {
    return '0';
  }

  const num1 = new Big(a);
  const num2 = new Big(b);
  return num1.div(num2).toString();
}
