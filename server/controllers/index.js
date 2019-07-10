const { User, 
  Location, 
  Landmark, 
  Question, 
  Answer, 
  Achievement,
  UserQuestions,
  sequelize } = require('../../db');

module.exports = {
  getLocations: (req, res) => {
    Location.findAll()
      .then(result => res.send(result));
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
    Question.findAll({
      include: {
        model: Landmark,
        where: { id: req.query.id }
      }
    }).then(result => {
      res.send(result);
    }).catch(e => res.status(500).send('Error getting questions'));
  },

  getAnswers: (req, res) => {
    const questionId = req.query.id;
    Answer.findAll({ where: { questionId } })
      .then(result => {
        res.send(result);
    }).catch(e => res.status(500).send('Error getting answers'));
  },

  updateUserQuestions: (req, res) => {
    // Find User from ID
    // Find Question from ID
    // Insert new row into user_question table
    // Find all from user_question table and get the length
    const userId = req.body.userId;
    const questionId = req.body.questionId;

    User.findByPk(userId)
      .then(user => {
        Question.findByPk(questionId)
        .then(question => user.addQuestion(question))
        .then(() => UserQuestions.findAll({ where: { userId } } ))
        .then(result => {
          const count = result.length;
          module.exports.calculateAchievement(userId, count, res);
        });
    })
  },

  calculateAchievement: (userId, count, res) => {
    // Get achievement ID from achievements table where count == count
    // Query UserAchivements for user id and achivement id
    // If found, return null
    // If no results
    //  Insert new user achievement
    //  Return new achievement
    Achievement.findOne({ where: { count }})
      .then(achievement => {
        if (achievement) {
          User.findByPk(userId)
          .then(user => user.addAchievement(achievement))
          .then(() => res.send(achievement))
        } else {
          res.status(200).send();
        }
      });
  },

  getUserAchievements: (req, res) => {
    const id = req.query.id;
    const query = `SELECT achievements.id, achievements.name, achievements.description FROM users
                   INNER JOIN user_achievements ON (users.id = user_achievements.userId)
                   INNER JOIN achievements on (user_achievements.achievementId = achievements.id)
                   WHERE users.id = ${id}`
    sequelize.query(query)
      .then(([results, metadata]) => res.send(results));
  }
}