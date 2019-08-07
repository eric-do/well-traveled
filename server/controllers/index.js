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
const Models = require("../models");
const Achievements = require("../models/achievements")
const LocationAwarder = require("../models/achievements/LocationAwarder");

module.exports = {
  getLocations: async (req, res) => {
    const locations = await Models.getLocations();
    res.send(locations);
  },

  getLandmarks: async (req, res) => {
    const locationId = req.query.id;
    try {
      const landmarks = await Models.getLandmarks(locationId);
      res.send(landmarks);
    } catch (e) {
      console.error(e);
      res.send([]);
    }
  },

  getQuestions: async (req, res) => {
    const landmarkId = req.query.id;
    try {
      const questions = await Models.getQuestions(landmarkId);
      res.send(questions);
    } catch (e) {
      console.error(e);
      res.send([]);
    }
  },

  getAnswers: async (req, res) => {
    const questionId = req.query.id;
    try {
      const answers = await Models.getAnswers(questionId);
      res.send(answers);
    } catch (e) {
      console.error(e);
      res.send([]);
    }
  },

  updateUserQuestions: async (req, res) => {
    try {
      const userId = await getUserId(req.body.token);
      const questionId = req.body.questionId;
      await Models.updateUserQuestions(userId, questionId);
      const newAchievements = await LocationAwarder.getAnyNewAchievements(userId);
      res.send(newAchievements);
    } catch (e) {
      console.error(e);
    }``
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

  addUserVote: async (req, res) => {
    // Check to see if there's an existing vote
    // If there's an existing vote, replace it
    // If there's an existing vote and it's the same as new vote, set to 0
    // Else set vote to new vote
    const { userId, questionId } = req.body;
    const direction = parseInt(req.body.direction);

    const newDirection = await Models.addUserVote(userId, questionId, direction);
    res.send({ direction: newDirection });
  },

  getUserVote: async (req, res) => {
    const { userId, questionId } = req.query;
    const userVote = await Models.getUserVote(userId, questionId);
    res.send(userVote);
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
