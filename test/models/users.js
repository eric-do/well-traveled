const chai = require("chai");
const assert = chai.assert;
const Models = require("../../server/models");
const { sequelize } = require("../../db");

describe("Models: users", () => {

  describe("updateUserQuestions / getUserQuestions", async () => {
    const userId = "testuser";
    const questionId = 1;

    beforeEach(async () => {
      await Models.updateUserQuestions(userId, questionId);
    });

    afterEach(async () => {
      const query = `DELETE FROM user_questions 
                     WHERE userId = "${userId}"`;
      await sequelize.query(query);
    });
    
    it("should return a non-empty array with valid properties", async () => {
      const questions = await Models.getUserQuestions(userId);
      
      assert.isArray(questions);
      assert.equal(questions.length, 1);
      assert.property(questions[0], "userId");
      assert.property(questions[0], "locationId");
      assert.property(questions[0], "location");
      assert.property(questions[0], "landmarkId");
      assert.property(questions[0], "questionId");
    });
  });
})