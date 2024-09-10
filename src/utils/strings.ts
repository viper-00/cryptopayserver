import { generate } from 'random-words';

export function RandomWords(length: number = 0): string[] {
  return length === 0 ? [generate() as string] : (generate(length) as string[]);
}

export function AddAndShuffleArray(arr: string[], str: string): string[] {
  arr.push(str);
  return arr.sort(() => 0.5 - Math.random());
}

export function GetRandomNumber(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function GetUniqueRandomIndices(max: number, count: number): number[] {
  const indices = new Set<number>();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * max));
  }
  return Array.from(indices);
}

export function OmitMiddleString(str: string, maxLength: number = 20): string {
  if (str.length <= maxLength) {
    return str;
  }

  if (maxLength <= 3) {
    return '...';
  }

  const partLength = Math.floor((maxLength - 3) / 2);
  const startPart = str.substring(0, partLength);
  const endPart = str.substring(str.length - partLength);

  console.log("${startPart}...${endPart}", `${startPart}...${endPart}`)

  return `${startPart}...${endPart}`;
}
