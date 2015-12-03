/*eslint-env mocha*/
/*global BOOMR_test,assert*/

describe("e2e/11-restiming/02-url-length", function() {
	var t = BOOMR_test;
	var tf = BOOMR.plugins.TestFramework;

	it("Should pass basic beacon validation", function(done) {
		t.validateBeaconWasSent(done);
	});

	it("Should have a restiming parameter on the beacon (if ResourceTiming is supported)", function() {
		if (t.isResourceTimingSupported()) {
			var b = tf.lastBeacon();
			assert.isDefined(b.restiming);
		}
	});

	it("Should have trimmed the long URL (if ResourceTiming is supported)", function() {
		if (t.isResourceTimingSupported()) {
			var b = tf.lastBeacon();
			assert.include(b.restiming, "khole?...");
		}
	});
});