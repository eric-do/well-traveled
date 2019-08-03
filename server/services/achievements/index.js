const { sequelize } = require("../../../db");

const getUserAchievements = async userId => {
  // Input: userId
  // Output: array containing user achievements
  // Constraints: none
  // Edge cases: no achievements

  // Pseudocode
  // Query for all the user's achievements
  // Return the user's achievements
  const query = `SELECT ua.userId, ua.achievementId, a.code, a.name, a.code, a.description
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

module.exports.getUserAchievements = getUserAchievements;
module.exports.getAchievementsFromCodes = getAchievementsFromCodes;
module.exports.getNewAchievements = getNewAchievements;
module.exports.awardAchievements = awardAchievements;