/* eslint-env mocha */
/* global BOOMR_test,assert */

// globals from this test
Array.prototype.push.apply(BOOMR_test.addedGlobals, ["Visitor", "s"]);

describe("e2e/16-third-party-analytics/07e-adobe-invalid-amcv", function() {
  var tf = BOOMR.plugins.TestFramework;
  var t = BOOMR_test;

  it("Should pass basic beacon validation", function(done) {
    t.validateBeaconWasSent(done);
  });

  it("Should be missing Adobe AID", function() {
    var b = tf.lastBeacon();

    assert.equal(b["tp.aa.aid"], undefined);
  });

  it("Should be missing Adobe MID", function() {
    var b = tf.lastBeacon();

    assert.equal(b["tp.aa.mid"], undefined);
  });

  it("Should not have an app error on the beacon", function() {
    var b = tf.lastBeacon();

    assert.equal(b.err, undefined);
  });

  it("Should not have a boomerang error on the beacon", function() {
    var b = tf.lastBeacon();

    assert.equal(b.errors, undefined);
  });
});
