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
    console.log(req.query);
    Question.findAll({
      include: {
        model: Landmark,
        where: {id: req.query.id }
      }
    }).then(result => {
      console.log(result);
      res.send(result);
    });
  }
}