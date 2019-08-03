const {
  User,
  Location,
  Landmark,
  Question,
  Answer,
  Achievement,
  UserQuestions,
  Vote,
  sequelize,
  Op
} = require("../../db");
const { admin, getUserId } = require("../../firebase.js");

module.exports = {
  updateUserQuestions: async (userId, questionId) => {
    // Find User from ID
    // Find Question from ID
    // Insert new row into user_question table
    // Find all from user_question table and get the length
    //const userId = req.body.userId;
    try {
      const insertQuery = `INSERT INTO user_questions (userId, questionId)
                           VALUES ('${userId}', '${questionId}')`;
      await sequelize.query(insertQuery);
    } catch (e) {
      console.error(e);
    }
  },
}
