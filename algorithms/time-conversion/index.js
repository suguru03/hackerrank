'use strict';

const fs = require('fs');

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
 * Complete the timeConversion function below.
 */
function timeConversion(s) {
  const [, hh, mm, ss, A] = s.match(/(\d{2}):(\d{2}):(\d{2})(.+)/);
  const h = hh % 12 + (A === 'PM' ? 12 : 0);
  return [`${h}`.padStart(2, 0), mm, ss].join(':');
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  let result = timeConversion(s);

  ws.write(result + '\n');

  ws.end();
}
