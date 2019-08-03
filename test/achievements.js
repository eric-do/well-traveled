var chai = require("chai");
var assert = chai.assert;
var Achievements = require("../server/models/achievements");

describe("getNewAchievements", () => {
  it("should should return an array of new achievements", async () => {
    const qualifyingAchievements = ["sfvisitor", "sfexplorer", "sfexpert"];
    const userAchievements = [{ code: "sfvisitor" }];
    const newAchievements = await Achievements.getNewAchievements(
      userAchievements,
      qualifyingAchievements
    );
    assert.typeOf(newAchievements, "array");
    assert.equal(newAchievements.length, 2);
  });

  it("should should return an empty array if there are no new achievements", async () => {
    const qualifyingAchievements = ["sfvisitor", "sfexplorer", "sfexpert"];
    const userAchievements = [
      { code: "sfvisitor" },
      { code: "sfexplorer" },
      { code: "sfexpert" }
    ];
    const newAchievements = await Achievements.getNewAchievements(
      userAchievements,
      qualifyingAchievements
    );
    assert.equal(newAchievements.length, 0);
  });

  it("should should an empty array if there are more user achievements than qualifying achievements", async () => {
    const qualifyingAchievements = ["sfvisitor", "sfexplorer"];
    const userAchievements = [
      { code: "sfvisitor" },
      { code: "sfexplorer" },
      { code: "sfexpert" }
    ];
    const newAchievements = await Achievements.getNewAchievements(
      userAchievements,
      qualifyingAchievements
    );
    assert.equal(newAchievements.length, 0);
  });
});

describe("getAchievementsFromCodes", () => {
  it("should return an array of achievements specific to the provided codes", async () => {
    const codes = ["sfvisitor", "sfexpert" ];
    const achievements = await Achievements.getAchievementsFromCodes(codes);

    assert.equal(achievements.length, 2);
    assert.equal(achievements[0].name, "San Francisco Visitor");
    assert.equal(achievements[1].name, "San Francisco Expert");
  })
})
