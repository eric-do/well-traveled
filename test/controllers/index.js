const chai = require("chai");
const assert = chai.assert;
const sinon = require("sinon");
const Controllers = require("../../server/controllers");

describe("Controllers", () => {
  describe("getLocations", () => {
    it("should send locations back to the client", async () => {
      const res = { send: () => {} };
      const req = {};
      const spy = sinon.spy(res, "send");
  
      await Controllers.getLocations(req, res);
      assert(spy.calledOnce, true);
    });
  });
  
  describe("getLandmarks", () => {
    it("should should send landmarks if passed valid location", async () => {
      const res = { send: () => {}  };
      const req = { query: { id: 1 } };
      const spy = sinon.spy(res, "send");
  
      await Controllers.getLandmarks(req, res);
  
      assert(spy.calledOnce, true);
    });
  });
  
  describe("getQuestions", () => {
    it("should should send questions if passed valid landmark", async () => {
      const res = { send: () => {} };
      const req = { query: { id: 1 } };
      const spy = sinon.spy(res, "send");
  
      await Controllers.getQuestions(req, res);
  
      assert(spy.calledOnce, true);
    });
  });
  
  describe("getAnswers", () => {
    it("should should send answers if passed valid question", async () => {
      const res = { send: () => {} };
      const req = { query: { id: 1 } };
      const spy = sinon.spy(res, "send");
  
      await Controllers.getAnswers(req, res);
  
      assert(spy.calledOnce, true);
    });
  });
  
});
