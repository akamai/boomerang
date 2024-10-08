/* eslint-env mocha */
/* global assert */

// globals from this test
Array.prototype.push.apply(BOOMR_test.addedGlobals, ["addDiv"]);

describe("e2e/07-autoxhr/38-xhr-uninteresting-mo", function() {
  var t = BOOMR_test;
  var tf = BOOMR.plugins.TestFramework;

  it("Should get 8 beacons: 1 onload, 7 xhr (XMLHttpRequest !== null)", function(done) {
    this.timeout(10000);
    t.ifAutoXHR(
      done,
      function() {
        t.ensureBeaconCount(done, 8);
      },
      this.skip.bind(this));
  });

  it("Should get 8 beacons: 1st onload beacon (XMLHttpRequest !== null)", function(done) {
    t.ifAutoXHR(
      done,
      function() {
        assert.include(tf.beacons[0].u, "38-xhr-uninteresting-mo.html");
        done();
      },
      this.skip.bind(this));
  });

  it("Should get 8 beacons: 2nd XHR 200 async beacon (XMLHttpRequest !== null)", function(done) {
    t.ifAutoXHR(
      done,
      function() {
        assert.include(tf.beacons[1].u, "script200.js");
        done();
      },
      this.skip.bind(this));
  });

  it("Should get 8 beacons: 3rd XHR 200 sync beacon (XMLHttpRequest !== null)", function(done) {
    t.ifAutoXHR(
      done,
      function() {
        assert.include(tf.beacons[2].u, "script200.js");
        done();
      },
      this.skip.bind(this));
  });

  it("Should get 8 beacons: 4th XHR 404 async beacon (XMLHttpRequest !== null)", function(done) {
    t.ifAutoXHR(
      done,
      function() {
        assert.include(tf.beacons[3].u, "script404.js");
        done();
      },
      this.skip.bind(this));
  });

  it("Should get 8 beacons: 5th XHR 404 sync beacon (XMLHttpRequest !== null)", function(done) {
    t.ifAutoXHR(
      done,
      function() {
        assert.include(tf.beacons[4].u, "script404.js");
        done();
      },
      this.skip.bind(this));
  });

  it("Should get 8 beacons: 6th X-O beacon (XMLHttpRequest !== null)", function(done) {
    t.ifAutoXHR(
      done,
      function() {
        assert.include(tf.beacons[5].u, "akamai.com");
        done();
      },
      this.skip.bind(this));
  });

  it("Should get 8 beacons: 7th abort beacon (XMLHttpRequest !== null)", function(done) {
    t.ifAutoXHR(
      done,
      function() {
        assert.include(tf.beacons[6].u, "script200.js");
        done();
      },
      this.skip.bind(this));
  });

  it("Should get 8 beacons: 8th timeout beacon (XMLHttpRequest !== null)", function(done) {
    t.ifAutoXHR(
      done,
      function() {
        assert.include(tf.beacons[7].u, "script200.js");
        done();
      },
      this.skip.bind(this));
  });

  it("Should get 1 beacons: 1 onload, 0 xhr (XMLHttpRequest === null)", function(done) {
    t.ifAutoXHR(
      done,
      this.skip.bind(this),
      function() {
        t.ensureBeaconCount(done, 1);
      });
  });

  it("Should have all beacons set rt.nstart = navigationTiming (if NavigationTiming is supported)", function(done) {
    t.ifAutoXHR(
      done,
      this.skip.bind(this),
      function() {
        if (typeof BOOMR.plugins.RT.navigationStart() !== "undefined") {
          for (var i = 0; i <= 7; i++) {
            assert.equal(tf.beacons[i]["rt.nstart"], BOOMR.plugins.RT.navigationStart());
          }
        }
        else {
          return this.skip.bind(this);
        }
      }
    );
  });
});
