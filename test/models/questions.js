const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
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
    });

    it("should return an empty array if passed an invalid landmark", async () => {
      const landmarkId = 'test';
      const questions = await Models.getQuestions(landmarkId);
  
      assert.isArray(questions);
      assert.equal(questions.length, 0);
    });
  });

  describe("getAnswers", async () => {
    it("should return an array with valid objects", async () => {
      const questionId = 1;
      const answers = await Models.getAnswers(questionId);
  
      assert.isArray(answers);
      assert.isAbove(answers.length, 0);
      assert.property(answers[0], "text");
      assert.property(answers[0], "correct");
      assert.property(answers[0], "questionId");
    });
  
    it("should return an empty array if passed an invalid question", async () => {
      const questionId = 'test';
      const answers = await Models.getAnswers(questionId);
  
      assert.isArray(answers);
      assert.equal(answers.length, 0);
    });
  });
});

describe("Models: user_questions", () => {
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

    it("should throw an error if passed an invalid questionId", async () => {
      const questionId = "invalidId";
      try {
        await Models.updateUserQuestions(userId, questionId);
      } catch (e) {
        assert.equal(e.name, "SequelizeDatabaseError");
      }
    });
  });
});
