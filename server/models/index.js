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

  getLocations: async () => Location.findAll(),

  getLandmarks: async locationId => {
    try {
      return await Landmark.findAll({
        include: {
          model: Location,
          where: { id: locationId }
        }
      });
    } catch (e) {
      throw new error("Could not get landmarks");
    }
  },

  getQuestions: async landmarkId => {
    const query = `SELECT question.id, question.text, 
                          question.rating, question.landmarkId, 
                          landmark.name, landmark.url, 
                          landmark.locationId
                   FROM questions AS question INNER JOIN landmarks AS landmark 
                   ON question.landmarkId = landmark.id AND landmark.id = ${landmarkId};`;
    try {
      return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    } catch (e) {
      return [];
    }
  },


  getUserQuestions: async userId => {
    const query = `SELECT uq.userId, l.locationId, loc.name AS location, 
                          q.landmarkId, uq.questionId
                   FROM user_questions AS uq
                   INNER JOIN questions AS q
                   ON uq.questionId = q.id
                   INNER JOIN landmarks AS l
                   ON q.landmarkId = l.id
                   INNER JOIN locations AS loc
                   ON l.locationId = loc.id
                   WHERE uq.userId = '${userId}'`;
    const userQuestions = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT
    });
    return userQuestions;
  },

  getAnswers: async questionId => {
    try {
      return await Answer.findAll({ where: { questionId } });
    } catch (e) {
      throw new error("Could not get answers");
    }
  }
};
