var chai = require("chai");
var assert = chai.assert;
var Models = require("../../server/models");

describe("Model: getQuestions", async () => {
  it("should return an array", async () => {
    const landmarkId = 1;
    const questions = await Models.getQuestions(landmarkId);

    assert.isArray(questions);
    assert.isAbove(questions.length, 0);
  })
});