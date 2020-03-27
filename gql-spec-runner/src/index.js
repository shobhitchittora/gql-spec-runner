const { Executor, Reporter, TestRunner } = require('../lib');

const options = {
  specToRun: 'query-spec',
  reporter: new Reporter(),
  testRunner: new TestRunner()
};

new Executor(options).run();