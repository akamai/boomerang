/* eslint-env mocha */
/* global BOOMR_test,assert */

describe("e2e/32-autoxhr-spa/22-brandwidth-spa.js", function() {
  var t = BOOMR_test;

  var tf = BOOMR.plugins.TestFramework;

  it("Should return bandwidth in beacon", function() {
    if (!t.isNetworkAPISupported()) {
      return;
    }

    var b = tf.beacons[0];

    assert(b.bw_time);
    assert(b.bw_time > 0);
    assert(!isNaN(b.bw_err));
    assert(b.bw_err > 0);
    assert(!isNaN(b.bw));
    assert(b.bw > 0);
  });
});
