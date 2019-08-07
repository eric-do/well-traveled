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
    const insertQuery = `INSERT INTO user_questions (userId, questionId)
                         VALUES (:userId, :questionId)`;
    await sequelize.query(insertQuery, {
      replacements: { userId, questionId }
    });
  },

  getLocations: async () => Location.findAll(),

  getLandmarks: async locationId => {
    return await Landmark.findAll({
      include: {
        model: Location,
        where: { id: locationId }
      }
    });
  },

  getQuestions: async landmarkId => {
    const query = `SELECT question.id, question.text, 
                          question.rating, question.landmarkId, 
                          landmark.name, landmark.url, 
                          landmark.locationId
                   FROM questions AS question INNER JOIN landmarks AS landmark 
                   ON question.landmarkId = landmark.id AND landmark.id = :landmarkId;`;
    return await sequelize.query(query, {
      replacements: { landmarkId },
      type: sequelize.QueryTypes.SELECT
    });
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
                   WHERE uq.userId = :user`;

    const userQuestions = await sequelize.query(query, {
      replacements: { user: userId },
      type: sequelize.QueryTypes.SELECT
    });
    return userQuestions;
  },

  getAnswers: async questionId => {
    return await Answer.findAll({ where: { questionId } });
  },

  addUserVote: async (userId, questionId, direction) => {
    // Check to see if there's an existing vote
    // If there's an existing vote, replace it
    // If there's an existing vote and it's the same as new vote, set to 0
    // Else set vote to new vote

    const findQuery = `SELECT * FROM user_votes
                       WHERE userId = :userId
                       AND questionId = :questionId`;

    const updateQuery = `UPDATE user_votes 
                         SET direction = :direction
                         WHERE userId = :userId
                         AND questionId = :questionId`;

    const insertQuery = `INSERT INTO user_votes
                         (userId, questionId, direction)
                         VALUES (:userId, :questionId, :direction)`;

    const existingData = await sequelize.query(findQuery, {
      replacements: { userId, questionId },
      type: sequelize.QueryTypes.SELECT
    });

    if (existingData.length > 0) {
      await sequelize.query(updateQuery, {
        replacements: { userId, direction, questionId }
      });
      return existingData[0].direction === direction ? 0 : direction;
    } else {
      await sequelize.query(insertQuery, {
        replacements: { userId, questionId, direction }
      });
      return direction;
    }
  },

  getUserVote: async (userId, questionId) => {
    const query = `SELECT * FROM user_votes
                   WHERE userId = :userId
                   AND questionID = :questionId`;

    const userVotes = await sequelize.query(query, {
      replacements: { userId, questionId },
      type: sequelize.QueryTypes.SELECT
    });

    return userVotes[0];
  },

  getUpvotes: async(questionId) => {
    const query = `SELECT SUM(direction) AS sum
                   FROM user_votes
                   WHERE direction > 0
                   AND questionId = :questionId`;

    const sum = await sequelize.query(query, {
      replacements: { questionId }
    });
    return sum[0][0];
  }
};
