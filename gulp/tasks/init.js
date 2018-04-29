'use strict';

const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const Aigle = require('aigle');
const prompt = require('prompt');

Aigle.promisifyAll(prompt);

gulp.task('init', init);

const schema = {
  properties: {
    name: {
      type: 'string',
      message: 'put a question name',
      required: true,
    },
  },
};

const baseDir = path.join(__dirname, '../../algorithms');

async function init() {
  prompt.start();
  const { name } = await prompt.getAsync(schema);
  const targetDir = path.join(baseDir, name);

  fs.mkdirSync(targetDir);

  const indexpath = path.join(targetDir, 'index.js');
  fs.writeFileSync(indexpath, '');

  const testpath = path.join(targetDir, 'test.js');
  const testfile = `'use strict';
module.exports = [
  {
    input: '',
    result: ''
  }
];
`;
  fs.writeFileSync(testpath, testfile);
}
