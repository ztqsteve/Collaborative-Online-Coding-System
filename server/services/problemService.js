var problemModel = require('../models/problemModel');

var getProblems = function () {
  return new Promise((resolve, reject) => {
    problemModel.find({}, function (err, problems) {
      if (err) {
        reject(err);
      } else {
        resolve(problems);
      }
    });
  });
}

var getProblem = function (id) {
  return new Promise((resolve, reject) => {
    problemModel.findOne({ id: id }, function (err, problem) {
      if (err) {
        reject(err);
      } else {
        resolve(problem);
      }
    });
  });
}

var addProblem = function (newProblem) {
  return new Promise((resolve, reject) => {
    problemModel.findOne({ name: newProblem.name }, function (err, problem) {
    if (problem) {
      reject('Problem name already exists');
    } else {
      problemModel.countDocuments({}, function (err, num) {
        newProblem.id = num + 1;
        var mongoProblem = new problemModel(newProblem);
        mongoProblem.save();
        resolve(newProblem);
      });
    }
    });
  })
}

module.exports = {
  getProblems,
  getProblem,
  addProblem
}
