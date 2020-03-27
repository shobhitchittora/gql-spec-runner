const yaml = require('yaml');

// Can support stream parsing or directly parsing file string
const parseYaml = function (file) {
  return yaml.parse(file);
}

module.exports = {
  parseYaml
}