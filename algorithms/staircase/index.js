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
 * Complete the staircase function below.
 */
function staircase(n) {
  const array = Array(n);
  for (let i = 0; i < n; i++) {
    let str = '';
    for (let j = 0; j < n; j++) {
      str += j < n - i - 1 ? ' ' : '#';
    }
    array[i] = str;
  }
  return array;
}

function main() {
  const n = parseInt(readLine(), 10);

  console.log(staircase(n).join('\n'));
}
