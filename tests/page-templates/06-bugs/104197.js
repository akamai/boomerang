/* eslint-env mocha */
/* global assert */

// globals from this test
Array.prototype.push.apply(BOOMR_test.addedGlobals, ["ga"]);

describe("e2e/06-bugs/104197", function() {
  var tf = BOOMR.plugins.TestFramework;
  var t = BOOMR_test;

  it("Should get 3 beacons: 1 onload (ignored), 1 manual, 1 post-'prerender'", function(done) {
    this.timeout(10000);
    t.ensureBeaconCount(done, 3);
  });

  it("Should have the first beacon be a Page Load beacon", function() {
    assert.isUndefined(tf.beacons[0]["http.initiator"]);
  });

  it("Should have the second beacon be a manual beacon", function() {
    assert.equal(tf.beacons[1]["rt.start"], "manual");
  });

  it("Should have the third beacon be a Page Load beacon", function() {
    assert.isUndefined(tf.beacons[2]["http.initiator"]);
  });

  it("Should have the third beacon contain vis.pre", function() {
    assert.equal(tf.beacons[2]["vis.pre"], 1);
  });

  it("Should have the third beacon have NavigationTiming data (if available)", function() {
    if (t.isNavigationTimingSupported()) {
      assert.isDefined(tf.beacons[2].nt_nav_st);
      assert.isDefined(tf.beacons[2].nt_load_st);
    }
  });

  it("Should not have the third beacon have ResourceTiming data (if available)", function() {
    // NOTE: In a non-faked preload scenario, ResourceTiming should be on the beacon
    // But this test case is faking preload (after a regular load beacon has already fired,
    // so restiming won't be on the beacon)
    if (t.isResourceTimingSupported()) {
      assert.isUndefined(tf.beacons[2].restiming);
    }
  });

  it("Should have the third beacon have TPAnalytics data", function() {
    assert.equal(tf.beacons[2]["tp.ga.clientid"], "XXXXXXXXXX.YYYYYYYYYY");
  });
});
