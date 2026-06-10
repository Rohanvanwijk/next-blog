function reverseString(str: string): string {
  const splitted = str.split("");
  const array = [];
  for (let i = splitted.length - 1; i >= 0; i--) {
    array.push(splitted[i]);
  }
  return array.join("");
}

function countOccurrences(str: string): { char: string; count: number }[] {
  const array = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const index = array.findIndex((item) => item.char === char);
    if (index !== -1) {
      array[index].count++;
    } else {
      array.push({ char, count: 1 });
    }
  }
  return array;
}

function uniqueArray(arr: number[]): number[] {
  const array: number[] = [];
  for (const num of arr) {
    if (!array.includes(num)) {
      array.push(num);
    }
  }
  return array;
}

function debounce(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null;
  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export { reverseString, countOccurrences, uniqueArray, debounce };
