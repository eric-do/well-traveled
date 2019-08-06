const chai = require("chai");
const assert = chai.assert;
const Models = require("../../server/models");
const { sequelize } = require("../../db");

describe("Models: questions", () => {
  describe("getQuestions", async () => {
    it("should return an array", async () => {
      const landmarkId = 1;
      const questions = await Models.getQuestions(landmarkId);
  
      assert.isArray(questions);
      assert.isAbove(questions.length, 0);
      assert.property(questions[0], "id");
      assert.property(questions[0], "text");
      assert.property(questions[0], "rating");
      assert.property(questions[0], "landmarkId");
    })
  });
})