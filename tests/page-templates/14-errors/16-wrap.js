/* eslint-env mocha */
/* global BOOMR_test,assert */

// globals from this test
Array.prototype.push.apply(BOOMR_test.addedGlobals, ["errorFunction", "goodFunction", "wrappedBad"]);

describe("e2e/14-errors/16-wrap", function() {
  var tf = BOOMR.plugins.TestFramework;
  var t = BOOMR_test;
  var C = BOOMR.utils.Compression;

  it("Should have sent a single beacon validation", function(done) {
    t.validateBeaconWasSent(done);
  });

  it("Should have put the err on the beacon", function() {
    var b = tf.lastBeacon();

    assert.isDefined(b.err);
  });

  it("Should have had a single error", function() {
    var b = tf.lastBeacon();

    assert.equal(C.jsUrlDecompress(b.err).length, 1);
  });

  it("Should have count = 1", function() {
    var b = tf.lastBeacon();
    var err = BOOMR.plugins.Errors.decompressErrors(C.jsUrlDecompress(b.err))[0];

    assert.equal(err.count, 1);
  });

  it("Should have fileName of the page (if set)", function() {
    var b = tf.lastBeacon();
    var err = BOOMR.plugins.Errors.decompressErrors(C.jsUrlDecompress(b.err))[0];

    if (err.fileName) {
      assert.include(err.fileName, window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1));
    }
    else {
      return this.skip();
    }
  });

  it("Should have functionName of 'errorFunction'", function() {
    var b = tf.lastBeacon();
    var err = BOOMR.plugins.Errors.decompressErrors(C.jsUrlDecompress(b.err))[0];

    if (err.functionName) {
      assert.equal(err.functionName, "errorFunction");
    }
    else {
      return this.skip();
    }
  });

  it("Should have message = 'a is not defined' or 'Can't find variable: a' or ''a' is undefined'", function() {
    var b = tf.lastBeacon();
    var err = BOOMR.plugins.Errors.decompressErrors(C.jsUrlDecompress(b.err))[0];

    // Skip for IE6
    if (err.message === "[object Error]") {
      return this.skip();
    }

    // Chrome, Firefox == a is not defined, Safari = Can't find variable, Edge = 'a' is not defined
    assert.isTrue(
      err.message.indexOf("a is not defined") !== -1 ||
      err.message.indexOf("Can't find variable: a") !== -1 ||
      err.message.indexOf("'a' is undefined") !== -1 ||
      err.message.indexOf("'a' is not defined") !== -1);
  });

  it("Should have source = APP", function() {
    var b = tf.lastBeacon();
    var err = BOOMR.plugins.Errors.decompressErrors(C.jsUrlDecompress(b.err))[0];

    assert.equal(err.source, BOOMR.plugins.Errors.SOURCE_APP);
  });

  it("Should have stack with the stack", function() {
    var b = tf.lastBeacon();
    var err = BOOMR.plugins.Errors.decompressErrors(C.jsUrlDecompress(b.err))[0];

    assert.isDefined(err.stack);
  });

  it("Should have not have BOOMR_plugins_errors_wrap on the stack", function() {
    var b = tf.lastBeacon();
    var err = BOOMR.plugins.Errors.decompressErrors(C.jsUrlDecompress(b.err))[0];

    assert.notInclude(err.stack, "BOOMR_plugins_errors_wrap");
  });

  it("Should have type = 'ReferenceError' or 'Error'", function() {
    var b = tf.lastBeacon();
    var err = BOOMR.plugins.Errors.decompressErrors(C.jsUrlDecompress(b.err))[0];

    assert.isTrue(err.type === "ReferenceError" || err.type === "Error");
  });

  it("Should have via = APP", function() {
    var b = tf.lastBeacon();
    var err = BOOMR.plugins.Errors.decompressErrors(C.jsUrlDecompress(b.err))[0];

    assert.equal(err.via, BOOMR.plugins.Errors.VIA_APP);
  });

  it("Should have columNumber to be a number if specified", function() {
    var b = tf.lastBeacon();
    var err = BOOMR.plugins.Errors.decompressErrors(C.jsUrlDecompress(b.err))[0];

    if (typeof err.columnNumber !== "undefined") {
      assert.isTrue(err.columnNumber >= 0);
    }
    else {
      return this.skip();
    }
  });

  it("Should have lineNumber ~ " + (HEADER_LINES + 3), function() {
    var b = tf.lastBeacon();
    var err = BOOMR.plugins.Errors.decompressErrors(C.jsUrlDecompress(b.err))[0];

    if (err.lineNumber) {
      assert.closeTo(err.lineNumber, HEADER_LINES + 3, 5);
    }
    else {
      return this.skip();
    }
  });

  it("Should have not set ranAnyways", function() {
    assert.isUndefined(window.ranAnyways);
  });
});
