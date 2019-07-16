const Sequelize = require('sequelize');

const sequelize = new Sequelize('mvp', 'root', 'student', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { timestamps: false }
);

const Location = sequelize.define('location', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { timestamps: false }
);

const Landmark = sequelize.define('landmark', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { timestamps: false }
);

const Question = sequelize.define('question', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
}, { timestamps: false }
);

const Answer = sequelize.define('answer', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  correct: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}, { timestamps: false }
);

const Achievement = sequelize.define('achievement', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  count: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, { timestamps: false }
);

const Vote = sequelize.define('vote', {
  direction: {
    type: Sequelize.TINYINT,
    allowNull: false
  }
}, { timestamps: false }
);

Location.hasMany(Landmark);
Landmark.belongsTo(Location);
Landmark.hasMany(Question);
Question.belongsTo(Landmark);
Question.hasMany(Answer);
Answer.belongsTo(Question);
Achievement.belongsToMany(User, { through: 'user_achievements' });
User.belongsToMany(Achievement, { through: 'user_achievements' });
Question.belongsToMany(User, { through: 'user_questions' });
User.belongsToMany(Question, { through: 'user_questions' });
Vote.belongsTo(User);
User.hasMany(Vote);
Vote.belongsTo(Question);
Question.hasMany(Vote);


const UserQuestions = sequelize.model('user_questions')
const UserAchievements = sequelize.model('user_achievements');
sequelize.sync({ force: false });

module.exports = { User, Location, 
                   Landmark, Question, 
                   Answer, Achievement,
                   UserQuestions, UserAchievements, Vote, sequelize };