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
      if (!re.test(filename)) {
        return;
      }
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
  const testCases = require(test);
  const keys = _.chain(testCases)
    .first()
    .omit('result')
    .keys()
    .value();

  // create dummy
  const event = new Event();
  const log = (...args) => {
    console.log(...args);
    event.emit('data', args[0]);
  };
  const dummyFs = {
    createWriteStream() {
      return {
        write: log,
        end() {},
      };
    },
  };
  const ctx = {
    require() {
      return dummyFs;
    },
    process,
    console: { log },
  };

  describe(name, () => {
    _.forEach(testCases, test => {
      let str = _.reduce(keys, (s, key) => `${s}${key}: ${test[key]} `, '');
      str += `-> ${test.result}`;
      it(str, () => {
        new Agent(index, ctx).run();

        // run test cases
        const logs = [];
        event.on('data', data => logs.push(data));
        _.forEach(keys, key => {
          process.stdin.emit('data', `${test[key]}\n`);
        });
        process.stdin.emit('end');

        // remove events
        event.removeAllListeners('data');
        process.stdin.removeAllListeners('data');
        process.stdin.removeAllListeners('end');

        const result = logs.pop();
        assert.deepEqual(
          typeof result === 'string' ? result.trim() : result,
          test.result,
        );
      });
    });
  });
}
