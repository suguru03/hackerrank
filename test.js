'use strict';

const fs = require('fs');
const path = require('path');
const Event = require('events');
const assert = require('assert');

const _ = require('lodash');
const { Agent } = require('vm-agent');
const argv = require('minimist')(process.argv.slice(2));

const target = argv.target || argv.t || '.*';
const mainpath = path.resolve(__dirname, 'algorithms');
const re = new RegExp(target);

(function resolve(dirpath, fileMap) {
  _.forEach(fs.readdirSync(dirpath), filename => {
    const filepath = path.resolve(dirpath, filename);
    if (fs.statSync(filepath).isDirectory()) {
      const map = { name: filename };
      resolve(filepath, map);
      createTest(map);
      return;
    }
    if (/.js$/.test(filename)) {
      const name = path.basename(filename, '.js');
      fileMap[name] = filepath;
    }
  });
})(mainpath);

function createTest({ name, index, test }) {
  if (!index || !test) {
    throw new Error('index or test not found');
  }
  const event = new Event();
  const ctx = {
    process,
    console: {
      log(...args) {
        console.log(...args);
        event.emit('data', args[0]);
      },
    },
  };
  const { main } = new Agent(index, ctx).run().getInnerVariable();
  const testCases = require(test);
  let testIndex = 0;
  let count = 0;
  const keys = _.chain(testCases)
    .first()
    .omit('result')
    .keys()
    .value();
  const size = keys.length;

  describe(name, () => {
    _.forEach(testCases, test => {
      let str = _.reduce(keys, (s, key) => `${s}${key}: ${test[key]} `, '');
      str += `-> ${test.result}`;
      it(str, () => {
        const logs = [];
        event.on('data', log);
        _.forEach(keys, key => {
          process.stdin.emit('data', `${test[key]}\n`);
        });
        process.stdin.emit('end');
        event.removeListener('data', log);
        assert.deepStrictEqual(logs.pop(), test.result);

        function log(data) {
          logs.push(data);
        }
      });
    });
  });
}
