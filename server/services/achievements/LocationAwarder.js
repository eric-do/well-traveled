const { sequelize } = require("../../../db");
const {
  getUserAchievements,
  getNewAchievements,
  awardAchievements
} = require("./");

const getAnyNewAchievements = async userId => {
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
    const sumAnsweredQuestions = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT
    });
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

module.exports.getAnyNewAchievements = getAnyNewAchievements;
