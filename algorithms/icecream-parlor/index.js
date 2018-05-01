process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = '';
var input_stdin_array = '';
var input_currentline = 0;

process.stdin.on('data', function(data) {
  input_stdin += data;
});

process.stdin.on('end', function() {
  input_stdin_array = input_stdin.split('\n');
  main();
});

function readLine() {
  return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

function icecreamParlor(m, arr) {
  const map = {};
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const n = arr[i];
    const rest = m - n;
    if (map[rest]) {
      result.push(map[rest], i + 1);
      break;
    }
    map[n] = i + 1;
  }
  return result;
}

function main() {
  var t = parseInt(readLine());
  for (var a0 = 0; a0 < t; a0++) {
    var m = parseInt(readLine());
    var n = parseInt(readLine());
    arr = readLine().split(' ');
    arr = arr.map(Number);
    var result = icecreamParlor(m, arr);
    console.log(result.join(' '));
  }
}
