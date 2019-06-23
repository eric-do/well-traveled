const { User, 
  Location, 
  Landmark, 
  Question, 
  Answer, 
  Achievement } = require('../../db');

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
  }
}