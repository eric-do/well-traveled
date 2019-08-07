const chai = require("chai");
const assert = chai.assert;
const Models = require("../../server/models");
const { sequelize } = require("../../db");

describe("Models: user_votes", () => {
  const userId = "testUser";

  after("Delete test user info", async () => {
    const query = `DELETE FROM user_votes 
                   WHERE userId = "${userId}"`;
    await sequelize.query(query);
  });

  it("should add vote and return direction if the user/vote doesn't exist", async () => {
    const questionId = 1;
    const direction = 1;

    const updateDirection = await Models.addUserVote(userId, questionId, direction);
    const userVote = await Models.getUserVote(userId, questionId);

    assert.equal(updateDirection, 1);
    assert.isArray(userVote);
    assert.equal(userVote.length, 1);
    assert.property(userVote[0], "direction");
    assert.property(userVote[0], "userId");
    assert.property(userVote[0], "questionId");
  });

  it("should update vote and return new direction for an existing vote", async () => {
    const questionId = 1;
    const direction = -1;

    const updateDirection = await Models.addUserVote(userId, questionId, direction);
    const userVote = await Models.getUserVote(userId, questionId);

    assert.equal(updateDirection, -1);
    assert.isArray(userVote);
    assert.equal(userVote.length, 1);
    assert.property(userVote[0], "direction");
    assert.property(userVote[0], "userId");
    assert.property(userVote[0], "questionId");
  });

  it("should update vote and return 0 for an existing vote in the same direction", async () => {
    const questionId = 1;
    const direction = -1;

    const updateDirection = await Models.addUserVote(userId, questionId, direction);
    const userVote = await Models.getUserVote(userId, questionId);

    assert.equal(updateDirection, 0);
    assert.isArray(userVote);
    assert.equal(userVote.length, 1);
    assert.property(userVote[0], "direction");
    assert.property(userVote[0], "userId");
    assert.property(userVote[0], "questionId");
  });

  it("should return the correct number of upvotes", async () => {
    const questionId = 2;
    const addQuery1 = `INSERT INTO user_votes (userId, questionId, direction) 
                       VALUES ('eric', 2, 1);`
    const addQuery2 = `INSERT INTO user_votes (userId, questionId, direction) 
                       VALUES ('tina', 2, 1);`
    const deleteQuery = `DELETE FROM user_votes 
                         WHERE questionId = ${questionId}`
    await sequelize.query(addQuery1);
    await sequelize.query(addQuery2);
    const upvotes = await Models.getUpvotes(questionId);
    await sequelize.query(deleteQuery);
    assert.equal(upvotes[0][0].sum, 2);
  })

  it("should not allow duplicate votes", () => {

  });
});