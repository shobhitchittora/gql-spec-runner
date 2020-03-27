const { request } = require('graphql-request');
const assert = require('assert');

const PORT = 8080;

const TestRunner = function () {
}

TestRunner.prototype.runTest = function ({ query, expected }) {
  request(`http://localhost:${PORT}/graphql`, query)
    .then(
      result => {
        assert.equal(result.hello, expected)

        console.log(`${result.hello} === ${expected}`, result.hello === expected);
      }
    )
  return true;
}

module.exports = {
  TestRunner
}