var chai = require("chai");
var assert = chai.assert;
var Models = require("../server/models");

describe("getLocations", async () => {
  it("should return an array", async () => {
    const locations = await Models.getLocations();

    assert.isArray(locations);
    assert.isAbove(locations.length, 0);
  });
});

describe("getQuestions", async () => {
  it("should return an array", async () => {
    const questions = await Models.getQuestions(1);

    assert.isArray(questions);
    assert.isAbove(questions.length, 0);
  })
});