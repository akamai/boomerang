/*eslint-env mocha*/
/*global BOOMR_test,assert*/

describe("e2e/04-page-params/06-custom-timers", function() {
	var tf = BOOMR.plugins.TestFramework;
	var t = BOOMR_test;

	it("Should pass basic beacon validation", function(done){
		t.validateBeaconWasSent(done);
	});

	it("Should take as long as the img.jpg (if NavigationTiming is supported)", function(){
		if (t.isNavigationTimingSupported()) {
			t.validateBeaconWasSentAfter(0, "img.jpg", 3000, 0, 30000, true);
		}
	});

	it("Shouldn't have a load time (if NavigationTiming is not supported)", function(){
		if (!t.isNavigationTimingSupported()) {
			var b = tf.lastBeacon();
			assert.equal(b.t_done, undefined);
			assert.equal(b["rt.start"], "none");
		}
	});

	it("Should have the custom timer 1 - URL defined", function(){
		var b = tf.lastBeacon();
		var timers = t.parseTimers(b.t_other);
		assert.closeTo(b["ctim.CT1_st"], 100, 20);
		assert.closeTo(parseInt(timers["ctim.CT1"]), 3000, 100);
	});

	it("Should have the custom timer 2 - XPath", function(){
		var b = tf.lastBeacon();
		var timers = t.parseTimers(b.t_other);
		assert.closeTo(b["ctim.CT2_st"], 100, 100);
		assert.closeTo(parseInt(timers["ctim.CT2"]), 3000, 100);
	});

	it("Should have the custom timer 3 - QuerySelector", function(){
		var b = tf.lastBeacon();
		var timers = t.parseTimers(b.t_other);
		assert.closeTo(b["ctim.CT3_st"], 100, 100);
		assert.closeTo(parseInt(timers["ctim.CT3"]), 3000, 100);
	});

	it("Should have the custom timer 4 - URL is Slowest", function(){
		var b = tf.lastBeacon();
		var timers = t.parseTimers(b.t_other);
		assert.closeTo(b["ctim.CT4_st"], 100, 100);
		assert.closeTo(parseInt(timers["ctim.CT4"]), 3000, 100);
	});

	it("Should have the custom timer 5 - URL empty", function(){
		var b = tf.lastBeacon();
		var timers = t.parseTimers(b.t_other);
		assert.equal(b["ctim.CT5_st"], undefined);
		assert.equal(timers["ctim.CT5"], undefined);
	});

	it("Should have the custom timer 6 - No options", function(){
		var b = tf.lastBeacon();
		var timers = t.parseTimers(b.t_other);
		assert.equal(b["ctim.CT6_st"], undefined);
		assert.equal(timers["ctim.CT6"], undefined);
	});

	it("Should have the custom timer 7 - Parameter2 is Slowest", function(){
		var b = tf.lastBeacon();
		var timers = t.parseTimers(b.t_other);
		assert.closeTo(b["ctim.CT7_st"], 100, 20);
		assert.closeTo(parseInt(timers["ctim.CT7"]), 3000, 100);
	});
});
