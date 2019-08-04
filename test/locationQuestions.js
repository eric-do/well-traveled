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

describe("getLandmarks", async () => {
  it("should return an array", async () => {
    const locationId = 1;
    const landmarks = await Models.getLandmarks(locationId);

    assert.isArray(landmarks);
    assert.isAbove(landmarks.length, 0);
  });
});

describe("getQuestions", async () => {
  it("should return an array", async () => {
    const landmarkId = 1;
    const questions = await Models.getQuestions(landmarkId);

    assert.isArray(questions);
    assert.isAbove(questions.length, 0);
  })
});