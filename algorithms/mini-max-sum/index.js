'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString
    .trim()
    .split('\n')
    .map(str => str.trim());

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the miniMaxSum function below.
 */
function miniMaxSum(arr) {
  let sum = 0;
  let min = Infinity;
  let max = -Infinity;
  for (const n of arr) {
    sum += n;
    min = Math.min(min, n);
    max = Math.max(max, n);
  }
  return [sum - max, sum - min];
}

function main() {
  const arr = readLine()
    .split(' ')
    .map(arrTemp => parseInt(arrTemp, 10));

  console.log(miniMaxSum(arr).join(' '));
}
