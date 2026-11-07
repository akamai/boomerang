/* eslint-env mocha */
/* global chai */

describe("BOOMR.utils.arrayFilter()", function() {
  var assert = chai.assert;

  it("Should return an empty array if input is not an array", function() {
    var expect = [];

    var filterFunction = function() {
      return false;
    };

    assert.deepEqual(BOOMR.utils.arrayFilter(null, filterFunction), expect);
  });

  it("Should return an empty array if predicate is not a function", function() {
    var input = [1, 2, 3, 4],
        expect = [];

    assert.deepEqual(BOOMR.utils.arrayFilter(input, null), expect);
  });

  it("Should return an empty array if the predicate only returns false", function() {
    var input = [1, 2, 3, 4],
        expect = [];

    var filterFunction = function() {
      return false;
    };

    assert.deepEqual(BOOMR.utils.arrayFilter(input, filterFunction), expect);
  });

  it("Should return an array of length one if only one returns true", function() {
    var input = [true, false],
        expect = [true];

    var filterFunction = function(value) {
      return value;
    };

    assert.deepEqual(BOOMR.utils.arrayFilter(input, filterFunction), expect);
  });

  it("Should have the array passed in as the third value and return the complete array as passed in", function() {
    var input = [1, 2, 3],
        expect = input;

    var filterFunction = function(value, index, array) {
      assert.deepEqual(array, expect);

      return true;
    };

    assert.deepEqual(BOOMR.utils.arrayFilter(input, filterFunction), expect);
  });

  it("Should return half the array of numbers as it matches the rule we defined in the filter function", function() {
    var input = [1, 2, 3, 4],
        expect = [1, 2];

    var filterFunction = function(value) {
      return value <= 2;
    };

    assert.deepEqual(BOOMR.utils.arrayFilter(input, filterFunction), expect);
  });

  it("Should also work if filter has been set to null or undefined (ie. lacking [].filter support)", function() {
    var input = [1, 2, 3, 4],
        expect = [1, 2];

    input.filter = undefined;

    var filterFunction = function(value) {
      return value <= 2;
    };

    assert.deepEqual(BOOMR.utils.arrayFilter(input, filterFunction), expect);
  });

  it("Should skip sparse array holes in the fallback while preserving explicit undefined values", function() {
    var input = [],
        visited = [];

    input.length = 4;
    input[1] = undefined;
    input[3] = "synthetic";
    input.filter = undefined;

    var result = BOOMR.utils.arrayFilter(input, function(value, index) {
      visited.push(index);

      return true;
    });

    assert.deepEqual(visited, [1, 3]);
    assert.deepEqual(result, [undefined, "synthetic"]);
  });

  it("Should ignore inherited indexes in the fallback", function() {
    var prototype = { 0: "inherited" },
        input = Object.create(prototype);

    input.length = 1;
    assert.deepEqual(BOOMR.utils.arrayFilter(input, function() {
      return true;
    }), []);
  });

  it("Should skip entries deleted by an earlier fallback predicate call", function() {
    var input = [1, 2, 3],
        visited = [];

    input.filter = undefined;

    var result = BOOMR.utils.arrayFilter(input, function(value, index) {
      visited.push(index);
      delete input[1];

      return true;
    });

    assert.deepEqual(visited, [0, 2]);
    assert.deepEqual(result, [1, 3]);
  });

  it("Should still filter array-like strings in the fallback", function() {
    var result = BOOMR.utils.arrayFilter("abc", function(value) {
      return value !== "b";
    });

    assert.deepEqual(result, ["a", "c"]);
  });
});
