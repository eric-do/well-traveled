const { sequelize } = require("../../../db");

module.exports.getAnyNewAchievements = async userId => {
  // Input: userId
  // Output: array of newly added achievements
  // Constraints: none
  // Edge cases: no qualifying achievements

  // Pseudocode
  // Get the sum of questions answered for each location
  // Get qualifying achievements for the user
  // Get new achievements for the user
  // Award new achievements to the unser in the db
  // Return new achievments
  const sumsOfLocationQuestions = await getSumOfAnsweredQuestions(userId);
  const qualifyingAchievements = await getQualifyingAchievements(
    sumsOfLocationQuestions
  );
  const userAchievements = await getUserAchievements(userId);
  const newAchievements = await getNewAchievements(
    userAchievements,
    qualifyingAchievements
  );
  console.log(newAchievements);
  await awardAchievements(userId, newAchievements); 
  return newAchievements;
};

const getSumOfAnsweredQuestions = async userId => {
  // Input: userId
  // Output: array of objects containing locations and sum of questions answered for location
  // Constraints: none
  // Edge cases: no results
  const query = `SELECT a.locationId, a.code, count(a.locationId) as count FROM (
      SELECT uq.userId, uq.questionId, land.locationId, loc.code, count(land.locationId) as count
      FROM user_questions AS uq 
      INNER JOIN questions AS q 
      ON uq.questionId = q.id 
      INNER JOIN landmarks AS land 
      ON q.landmarkId = land.id 
      INNER JOIN locations as loc
      ON land.locationId = loc.id
      WHERE uq.userId = "${userId}" 
      GROUP BY land.locationID, uq.questionId
    ) AS a
    GROUP BY a.locationId;`;

  try {
    const sumAnsweredQuestions = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    return sumAnsweredQuestions;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const getQualifyingAchievements = sumsOfLocationQuestions => {
  // Input: location questions sums array
  // Output: an array of qualifying achievement codes for the user
  // Constraints: none
  // Edge cases: no qualifying achievements

  // Pseudocode
  // For each location, determine applicable achievements and add code to array
  // Return array of qualifying achievements
  console.log(sumsOfLocationQuestions);
  const qualifyingAchievements = sumsOfLocationQuestions.reduce(
    (result, curr) => {
      if (curr.count >= 1) {
        result.push(`${curr.code}visitor`);
      }
      if (curr.count >= 5) {
        result.push(`${curr.code}explorer`);
      }
      if (curr.count >= 10) {
        result.push(`${curr.code}expert`);
      }
      return result;
    },
    []
  );
  return qualifyingAchievements;
};

const getUserAchievements = async userId => {
  // Input: userId
  // Output: array containing user achievements
  // Constraints: none
  // Edge cases: no achievements

  // Pseudocode
  // Query for all the user's achievements
  // Return the user's achievements
  const query = `SELECT ua.userId, ua.achievementId, a.code
                 FROM user_achievements AS ua
                 INNER JOIN achievements AS a
                 ON ua.achievementId = a.id
                 WHERE ua.userId = '${userId}'`;
  try {
    const userAchievements = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT
    });
    return userAchievements;
  } catch (e) {
    console.error(e);
  }
}

const getNewAchievements = async (userAchievements, qualifyingAchievements) => {
  // Input: user achievement array, qualifying achievement array
  // Output: array containing only new achievements for the user
  // Constraints: none
  // Edge cases: empty arrays

  // Pseudocode
  // Return non-overlapping achievements  
  const newAchievementCodes = qualifyingAchievements.filter(achievement => (
    userAchievements.every(userAchievement => userAchievement.code !== achievement)
  ));
  const newAchievements = await getAchievementsFromCodes(newAchievementCodes);
  return newAchievements;
};

const getAchievementsFromCodes = async codes => {
  if (codes.length > 0) {
    const formattedCodes = codes.map(code => `'${code}'`);
    const achievementsQuery = `SELECT * FROM achievements 
                               WHERE code in (${formattedCodes})`;
    const achievements = await sequelize.query(achievementsQuery, { type: sequelize.QueryTypes.SELECT });
    return achievements;
  } else {
    return []
  }
}

const awardAchievements = async (userId, achievements) => {
  // Input: user ID, and an achievement array with new achievements for the user
  // Output: none
  // Constraints: none
  // Edge cases: no achievement, invalid achievement code

  // Pseudocode
  // Insert achievement codes into user_achievements table
  if (achievements.length > 0) {
    await Promise.all(achievements.map(async achievement => {
      const query = `INSERT INTO user_achievements (userId, achievementId)
                     VALUES ('${userId}', '${achievement.id}')`;
      await sequelize.query(query);
    }));
  }
};
