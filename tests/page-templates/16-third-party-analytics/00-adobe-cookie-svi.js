/* eslint-env mocha */
/* global BOOMR_test,assert */

// globals from this test
Array.prototype.push.apply(BOOMR_test.addedGlobals, ["_satellite"]);

describe("e2e/16-third-party-analytics/00-adobe-cookie-svi", function() {
  var tf = BOOMR.plugins.TestFramework;
  var t = BOOMR_test;

  it("Should pass basic beacon validation", function(done) {
    t.validateBeaconWasSent(done);
  });

  it("Should have Adobe AID set (on a domain or in PhantomJS)", function() {
    if (t.canSetCookies()) {
      var b = tf.lastBeacon();

      assert.equal(b["tp.aa.aid"], "2B8147DA850785C4-6000010E2006DC28");
    }
  });

  it("Should be missing Adobe AID (on localhost or an IP)", function() {
    if (!t.canSetCookies()) {
      var b = tf.lastBeacon();

      assert.equal(b["tp.aa.aid"], undefined);
    }
  });

  it("Should be missing Adobe MID", function() {
    var b = tf.lastBeacon();

    assert.equal(b["tp.aa.mid"], undefined);
  });
});
