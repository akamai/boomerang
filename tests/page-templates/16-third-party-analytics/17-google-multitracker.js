/* eslint-env mocha */
/* global BOOMR_test,assert */

// globals from this test
Array.prototype.push.apply(BOOMR_test.addedGlobals, ["FakeTracker", "ga"]);

describe("e2e/16-third-party-analytics/17-google-multitracker", function() {
  var tf = BOOMR.plugins.TestFramework;
  var t = BOOMR_test;

  it("Should pass basic beacon validation", function(done) {
    t.validateBeaconWasSent(done);
  });

  it("Should have Google Analytics Client ID", function() {
    var b = tf.lastBeacon();

    assert.equal(b["tp.ga.clientid"], "XXXXXXXXXX.YYYYYYYYYY");
  });
});
