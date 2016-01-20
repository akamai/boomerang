/*eslint-env mocha*/
/*global BOOMR_test,assert*/

describe("e2e/04-page-params/03-custom-dimensions-js", function() {
	var tf = BOOMR.plugins.TestFramework;
	var t = BOOMR_test;

	it("Should pass basic beacon validation", function(done) {
		t.validateBeaconWasSent(done);
	});

	it("Should have the custom dimension 1 - JavaScript var Boolean", function() {
		var b = tf.lastBeacon();
		assert.equal(b["cdim.CD1"], "true");
	});

	it("Should have the custom dimension 2 - JavaScript function Boolean", function() {
		var b = tf.lastBeacon();
		assert.equal(b["cdim.CD2"], "false");
	});

	it("Should have the custom dimension 3 - JavaScript var Numeric", function() {
		var b = tf.lastBeacon();
		assert.equal(b["cdim.CD3"], "111");
	});

	it("Should have the custom dimension 4 - JavaScript function Numeric", function() {
		var b = tf.lastBeacon();
		assert.equal(b["cdim.CD4"], "222");
	});

	it("Should have the custom dimension 5 - JavaScript Var Text", function() {
		var b = tf.lastBeacon();
		assert.equal(b["cdim.CD5"], "abc");
	});

	it("Should have the custom dimension 6 - JavaScript function Text", function() {
		var b = tf.lastBeacon();
		assert.equal(b["cdim.CD6"], "def");
	});

	it("Should be missing custom dimension 7 - JavaScript var missing", function() {
		var b = tf.lastBeacon();
		assert.equal(b["cdim.CD7"], undefined);
	});

	it("Should be missing custom dimension 8 - QueryParam", function() {
		var b = tf.lastBeacon();
		assert.equal(b["cdim.CD8"], undefined);
	});

	it("Should be having custom dimension 9 - QuerySelector if QuerySelector is supported", function() {
		var b = tf.lastBeacon();
		if (t.isQuerySelectorSupported()) {
			assert.equal(b["cdim.CD9"], "444.44");
		}
	});

	it("Should be having custom dimension 9 - QuerySelector return undefined if QuerySelector not supported", function() {
		if (!t.isQuerySelectorSupported()) {
			var b = tf.lastBeacon();
			assert.equal(b["cdim.CD9"], undefined);
		}
	});


	it("Should be having custom dimension 10 - QuerySelector with non-standard attribute selector if QuerySelector is supported", function() {
		if (t.isQuerySelectorSupported()) {
			var b = tf.lastBeacon();
			assert.equal(b["cdim.CD10"], "444.44");
		}
	});

	it("Should be having custom dimension 11 - QuerySelector with multiple values if QuerySelector is supported", function() {
		if (t.isQuerySelectorSupported()) {
			var b = tf.lastBeacon();
			assert.equal(b["cdim.CD11"], "444.44");
		}
	});

	it("Should be missing custom dimension 12 - QuerySelector with no matched element", function() {
		var b = tf.lastBeacon();
		assert.equal(b["cdim.CD12"], undefined);
	});

	it("Should be missing custom dimension 13 - No parameter1, parameter2 or queryselector set should return undefined", function() {
		var b = tf.lastBeacon();
		assert.equal(b["cdim.CD13"], undefined);
	});

	it("Should be having custom dimension 14 - No parameter2 or queryselector set should return undefined", function() {
		var b = tf.lastBeacon();
		assert.equal(b["cdim.CD14"], undefined);
	});

	it("Should be having custom dimension 15 - Function custom_dimension15 has static function property isTrue and should return true", function() {
		var b = tf.lastBeacon();
		assert.equal(b["cdim.CD15"], "true");
	});

	it("Should be having custom dimension 16 - Pseudo class custom_dimension16 has prototype property isTrue and should return false since it's also a prototype member when accessing isTrue on an instance of the class", function() {
		var b = tf.lastBeacon();
		assert.equal(b["cdim.CD16"], "false");
	});

	it("Should be having custom dimension 17 - Should return \"false\" for a property set on the pseudo class prototype", function() {
		var b = tf.lastBeacon();
		assert.equal(b["cdim.CD17"], "false");
	});

	it("Should be having custom dimension 18 - Should return \"true\" for a property set on the pseudo class directly", function() {
		var b = tf.lastBeacon();
		assert.equal(b["cdim.CD18"], "true");
	});
});