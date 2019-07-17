const { User, 
  Location, 
  Landmark, 
  Question, 
  Answer, 
  Achievement,
  UserQuestions,
  Vote,
  sequelize,
  Op } = require('../../db');

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
  },

  addUserVote: (req, res) => {
    // Check to see if there's an existing vote
    // If there's an existing vote, replace it
    // If there's an existing vote and it's the same as new vote, set to 0
    // Else set vote to new vote
    const { userId, questionId } = req.body;
    const direction = parseInt(req.body.direction);

    let newDirection = 0;
    Vote.findAll({ where: { userId }})
      .then(result => result.length === 0 ? 0 : result[0].direction)
      .then(currentDirection => currentDirection === direction ? 0 : direction)
      .then(direction => {
        newDirection = direction;
        return Vote.upsert({userId, questionId, direction});
      })
      .then(() => res.send({ direction: newDirection }))
      .catch(e => console.error('Problem', e));
  },

  getUserVote: (req, res) => {
    const { userId, questionId } = req.query;

    Vote.findAll({ where: { userId, questionId }})
      .then(result => res.send(result[0]));
  },

  getUpvotes: (req, res) => {
    const { questionId } = req.query;

    Vote.sum('direction', { 
      where: { 
        questionId, 
        direction: { [Op.gt]: 0 }
      }
    })
      .then(upvotes => {
        console.log(upvotes);
        res.send({ upvotes });
      });
  },

  getDownvotes: (req, res) => {
    const { questionId } = req.query;

    Vote.sum('direction', { 
      where: { 
        questionId, 
        direction: { [Op.lt]: 0 }
      }
    })
      .then(downvotes => res.send({ downvotes }));
  }
}