const { table } = require('table');

const Reporter = function () {
  this.report = [
    ['Suite', 'Test', 'Result']
  ];

  this.resultCache = new Map();
}

Reporter.prototype.getCacheKey = function (suite, testName) {
  return `${suite}~${testName}`
}

Reporter.prototype.resolveCacheKey = function (key) {
  return key.split(`~`);
}

// Reporter.prototype.suiteStart = function (name) {
//   console.log(`Suite start - ${name}`)
// }

// Reporter.prototype.suiteEnd = function (name) {
//   console.log(`Suite end - ${name}`)
// }

Reporter.prototype.testStart = function (suite, testName) {
  console.log(`Test start - ${testName}`);
  this.resultCache.set(this.getCacheKey(suite, testName), 'failed');
}

Reporter.prototype.testEnd = function (suite, testName, result) {
  console.log(`Test end - ${testName}, with result ${result}`)
  this.resultCache.set(this.getCacheKey(suite, testName), result && 'success');
}

Reporter.prototype.testFail = function (suite, testName, error) {
  console.log(`Test fail - ${testName}, with error ${error}`)
  this.resultCache.set(this.getCacheKey(suite, testName), 'failed');
}

Reporter.prototype.print = function () {
  for (let [key, value] of this.resultCache) {
    const [suite, testName] = this.resolveCacheKey(key)
    this.report.push([suite, testName, value]);
  }
  console.log(table(this.report));
}

module.exports = {
  Reporter
}