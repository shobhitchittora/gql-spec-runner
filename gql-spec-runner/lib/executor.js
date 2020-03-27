const fs = require('fs');
const path = require('path');
const get = require('lodash.get');

const { Reporter, TestRunner } = require('./');

const { parseYaml } = require('../utils');


const Executor = function (options) {
  // TODO: Add default values to these options
  const { specToRun, reporter, testRunner } = options;

  this.specToRun = specToRun;
  this.reporter = reporter || new Reporter();
  this.testRunner = testRunner || new TestRunner();
}

Executor.prototype.run = function () {
  const specPath = path.join(__dirname, '../spec', `${this.specToRun}.yml`);
  const file = fs.readFileSync(specPath, 'utf8');
  const parsedYML = parseYaml(file);

  const suite = get(parsedYML, 'suite');

  get(suite, 'tests')
    .forEach(testConfig => {
      for (testName in testConfig) {
        const test = get(testConfig, testName);
        try {
          this.reporter.testStart(suite.name, testName)
          const result = this.testRunner.runTest(test)
          this.reporter.testEnd(suite.name, testName, result);
        } catch (e) {
          this.reporter.testFail(testName, e)
        }
      }
    });

  this.reporter.print();
}

module.exports = {
  Executor
}