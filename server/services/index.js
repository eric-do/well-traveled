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

  getUserAchievements: async (userId) => {
    try {
      const query = `SELECT user_achievements.userId, achievements.id AS achievementId, 
                            achievements.name, achievements.description FROM user_achievements 
                     INNER JOIN achievements on (user_achievements.achievementId = achievements.id)
                     WHERE user_achievements.userId = '${userId}';`;
      const results = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
      });
      return results;
    } catch (e) {
      throw new Error('Could not get achievements');
    }
  },
}
