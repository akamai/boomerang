/* eslint-env mocha */
/* global BOOMR_test,assert */
// globals from this test
Array.prototype.push.apply(BOOMR_test.addedGlobals, ["angular", "ng339", "angular_imgs", "angular_html5_mode", "angular_nav_routes", "handler", "custom_metric_1", "custom_metric_2", "custom_timer_1", "custom_timer_2", "i"]);

describe("e2e/05-angular/102-ui-router", function() {
  var tf = BOOMR.plugins.TestFramework;
  var t = BOOMR_test;

  var pathName = window.location.pathname;

  it("Should pass basic beacon validation", function(done) {
    t.validateBeaconWasSent(done);
  });

  it("Should have sent three beacons", function() {
    assert.equal(tf.beacons.length, 3);
  });

  it("Should have sent the first beacon as http.initiator = spa_hard", function() {
    assert.equal(tf.beacons[0]["http.initiator"], "spa_hard");
  });

  it("Should have sent all subsequent beacons as http.initiator = spa", function() {
    for (var i = 1; i < 2; i++) {
      assert.equal(tf.beacons[i]["http.initiator"], "spa");
    }
  });

  //
  // Beacon 1
  //
  it("Should have sent the first beacon for " + pathName, function() {
    var b = tf.beacons[0];

    assert.isTrue(b.u.indexOf(pathName) !== -1);
  });

  it("Should take as long as the longest img load (if MutationObserver and NavigationTiming are supported)", function() {
    if (t.isMutationObserverSupported() && typeof BOOMR.plugins.RT.navigationStart() !== "undefined") {
      t.validateBeaconWasSentAfter(0, "img.jpg&id=home", 500, 3000, 30000, 0);
    }
  });

  it("Should not have a load time (if MutationObserver is supported but NavigationTiming is not)", function() {
    if (t.isMutationObserverSupported() && typeof BOOMR.plugins.RT.navigationStart() === "undefined") {
      var b = tf.beacons[0];

      assert.equal(b.t_done, undefined);
    }
  });

  it("Should take as long as the XHRs (if MutationObserver is not supported but NavigationTiming is)", function() {
    if (!t.isMutationObserverSupported() && typeof BOOMR.plugins.RT.navigationStart() !== "undefined") {
      t.validateBeaconWasSentAfter(0, "widgets.json", 500, 0, 30000, false);
    }
  });

  it("Shouldn't have a load time (if MutationObserver and NavigationTiming are not supported)", function() {
    if (!t.isMutationObserverSupported() && typeof BOOMR.plugins.RT.navigationStart() === "undefined") {
      var b = tf.beacons[0];

      assert.equal(b.t_done, undefined);
      assert.equal(b["rt.start"], "none");
    }
  });

  //
  // Beacon 2
  //
  it("Should have sent the second beacon for /widgets/1", function() {
    var b = tf.beacons[1];

    assert.isTrue(b.u.indexOf("/widgets/1") !== -1);
  });

  it("Should have sent the second beacon with a timestamp of at least 1 second (if MutationObserver is supported)", function() {
    if (t.isMutationObserverSupported()) {
      // because of the widget IMG delaying 1 second
      var b = tf.beacons[1];

      assert.operator(b.t_done, ">=", 1000);
    }
  });

  it("Should have sent the second beacon with a timestamp of at least 1 millisecond (if MutationObserver is not supported)", function() {
    if (!t.isMutationObserverSupported()) {
      // because of the widget IMG delaying 1 second but we couldn't track it because no MO support
      var b = tf.beacons[1];

      assert.operator(b.t_done, ">=", 0);
    }
  });

  //
  // Beacon 3
  //
  it("Should have sent the third beacon for " + pathName, function() {
    var b = tf.beacons[2];

    assert.isTrue(b.u.indexOf(pathName) !== -1);
  });

  it("Should have sent the third with a timestamp of at least 3 seconds (if MutationObserver is supported)", function() {
    if (t.isMutationObserverSupported()) {
      var b = tf.beacons[2];

      assert.operator(b.t_done, ">=", 3000);
    }
  });

  it("Should have sent the third with a timestamp of under 1 second (if MutationObserver is not supported)", function() {
    if (!t.isMutationObserverSupported()) {
      var b = tf.beacons[2];

      assert.operator(b.t_done, "<=", 1000);
    }
  });
});
