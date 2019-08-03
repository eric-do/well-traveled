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
const Services = require("../services");
const Achievements = require("../services/achievements")
const LocationAwarder = require("../services/achievements/LocationAwarder");

module.exports = {
  getLocations: (req, res) => {
    Location.findAll().then(result => res.send(result));
  },

  getLandmarks: (req, res) => {
    Landmark.findAll({
      include: {
        model: Location,
        where: { id: req.query.id }
      }
    }).then(result => res.send(result));
  },

  getQuestions: (req, res) => {
    // Question.findAll({
    //   include: {
    //     model: Landmark,
    //     where: { id: req.query.id }
    //   }
    const landmarkId = req.query.id;
    const query = `SELECT question.id, question.text, question.rating, question.landmarkId,
                   landmark.name, landmark.url, landmark.locationId
                   FROM questions AS question INNER JOIN landmarks AS landmark 
                   ON question.landmarkId = landmark.id AND landmark.id = ${landmarkId};`;
    sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then(result => {
        res.send(result);
      })
      .catch(e => {
        console.log(e);
        res.status(500).send("Error getting questions");
      });
  },

  getAnswers: (req, res) => {
    const questionId = req.query.id;
    Answer.findAll({ where: { questionId } })
      .then(result => res.send(result))
      .catch(e => res.status(500).send("Error getting answers"));
  },

  updateUserQuestions: async (req, res) => {
    // Find User from ID
    // Find Question from ID
    // Insert new row into user_question table
    // Find all from user_question table and get the length

    try {
      const userId = await getUserId(req.body.token);
      const questionId = req.body.questionId;
      await Services.updateUserQuestions(userId, questionId);
      const newAchievements = await LocationAwarder.getAnyNewAchievements(userId);
      res.send(newAchievements);
    } catch (e) {
      console.error(e);
    }
  },

  getUserQuestions: async userId => {
    const query = `SELECT uq.userId, l.locationId, loc.name AS location, q.landmarkId, uq.questionId
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

  getAchievements: async (req, res) => {
    try {
      const userId = await getUserId(req.query.token);
      const achievements = await Achievements.getUserAchievements(userId);
      console.log(achievements);
      res.send(achievements);
    } catch (e) {
      res.status(500).send(e);
    }
  },

  addUserVote: (req, res) => {
    // Check to see if there's an existing vote
    // If there's an existing vote, replace it
    // If there's an existing vote and it's the same as new vote, set to 0
    // Else set vote to new vote
    const { userId, questionId } = req.body;
    const direction = parseInt(req.body.direction);

    let newDirection = 0;
    Vote.findAll({ where: { userId } })
      .then(result => (result.length === 0 ? 0 : result[0].direction))
      .then(currentDirection =>
        currentDirection === direction ? 0 : direction
      )
      .then(direction => {
        newDirection = direction;
        return Vote.upsert({ userId, questionId, direction });
      })
      .then(() => res.send({ direction: newDirection }))
      .catch(e => console.error("Problem", e));
  },

  getUserVote: (req, res) => {
    const { userId, questionId } = req.query;

    Vote.findAll({ where: { userId, questionId } }).then(result =>
      result.length > 0 ? res.send(result[0]) : null
    );
  },

  getUpvotes: (req, res) => {
    const { questionId } = req.query;

    Vote.sum("direction", {
      where: {
        questionId,
        direction: { [Op.gt]: 0 }
      }
    }).then(upvotes => {
      res.send({ upvotes });
    });
  },

  getDownvotes: (req, res) => {
    const { questionId } = req.query;

    Vote.sum("direction", {
      where: {
        questionId,
        direction: { [Op.lt]: 0 }
      }
    }).then(downvotes => res.send({ downvotes: Math.abs(downvotes) }));
  },

  validateUser: async (req, res) => {
    const { token } = req.query;
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken.uid);
    res.send({ uid: decodedToken.uid });
  }
};
