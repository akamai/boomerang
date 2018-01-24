/*eslint-env mocha*/
/*global BOOMR_test,assert*/

describe("e2e/04-page-params/02-page-group-xhrs", function() {
	var tf = BOOMR.plugins.TestFramework;
	var t = BOOMR_test;

	it("Should pass basic beacon validation", function(done) {
		t.validateBeaconWasSent(done);
	});

	it("Should have sent 11 beacons", function(done) {
		var _this = this;
		t.ifAutoXHR(
			done,
			function() {
				_this.timeout(25000);
				t.ensureBeaconCount(done, 11);
			},
			this.skip.bind(this));
	});

	it("Should set the Page Group of the first beacon 'Test Pages'", function() {
		var b = tf.beacons[0];
		assert.equal(b["h.pg"], "Test Pages");
	});

	it("Should reset the Session Length on the first beacon", function() {
		var b = tf.beacons[0];
		assert.equal(b["rt.sl"], "1");
	});

	it("Should set the Page Group of the second beacon 'XHR subresource'", function(done) {
		t.ifAutoXHR(
			done,
			function() {
				var b = tf.beacons[1];
				assert.equal(b["xhr.pg"], "XHR subresource");
				done();
			},
			this.skip.bind(this));
	});

	it("Should not increase the Session Length on the second beacon", function(done) {
		t.ifAutoXHR(
			done,
			function() {
				var b = tf.beacons[1];
				assert.equal(b["rt.sl"], "1");
				done();
			},
			this.skip.bind(this));
	});

	it("Should set the Page Group of the third beacon 'XHR not subresource'", function(done) {
		t.ifAutoXHR(
			done,
			function() {
				var b = tf.beacons[2];
				assert.equal(b["xhr.pg"], "XHR not subresource");
				done();
			},
			this.skip.bind(this));
	});

	it("Should increase the Session Length on the third beacon", function(done) {
		t.ifAutoXHR(
			done,
			function() {
				var b = tf.beacons[2];
				assert.equal(b["rt.sl"], "2");
				done();
			},
			this.skip.bind(this));
	});

	it("Should not set a Page Group on the fourth beacon", function(done) {
		t.ifAutoXHR(
			done,
			function() {
				var b = tf.beacons[3];
				assert.equal(b["xhr.pg"], undefined);
				done();
			},
			this.skip.bind(this));
	});

	it("Should increase the Session Length on the fourth beacon", function(done) {
		t.ifAutoXHR(
			done,
			function() {
				var b = tf.beacons[3];
				assert.equal(b["rt.sl"], "3");
				done();
			},
			this.skip.bind(this));
	});

	it("Should set the Page Group of the fifth beacon 'XHR'", function(done) {
		t.ifAutoXHR(
			done,
			function() {
				var b = tf.beacons[4];
				assert.equal(b["xhr.pg"], "XHR");
				done();
			},
			this.skip.bind(this));
	});

	it("Should not increase the Session Length on the fifth beacon", function(done) {
		t.ifAutoXHR(
			done,
			function() {
				var b = tf.beacons[4];
				assert.equal(b["rt.sl"], "3");
				done();
			},
			this.skip.bind(this));
	});

	it("Should have a sixth beacon matching QuerySelector based payload validation", function(done) {
		t.ifAutoXHR(
			done,
			function() {
				var b = tf.beacons[5];
				assert.equal(b["xhr.pg"], "PageGroupQuerySelector");
				done();
			},
			this.skip.bind(this));
	});

	it("Should have a seventh beacon matching XPath based payload validation", function(done) {
		if (!Function.prototype.bind) {
			return this.skip();
		}

		t.ifAutoXHR(
			done,
			function() {
				var b = tf.beacons[6];
				var pg = b["xhr.pg"];

				if (pg === "Test Pages" && t.isIE()) {
					// IE 6-11 doesn't have a proper XPath parser
					this.skip();
					return done();
				}

				assert.equal(pg, "PageGroupXPath");
				done();
			}.bind(this),
			this.skip.bind(this));
	});

	it("Should have a eigth beacon matching JSON based payload validation", function(done) {
		t.ifAutoXHR(
			done,
			function() {
				var b = tf.beacons[7];
				assert.equal(b["xhr.pg"], "PageGroupJson");
				done();
			},
			this.skip.bind(this));
	});

	it("Should have a ninth beacon matching text based payload validation", function(done) {
		t.ifAutoXHR(
			done,
			function() {
				var b = tf.beacons[8];
				assert.equal(b["xhr.pg"], "PageGroupText");
				done();
			},
			this.skip.bind(this));
	});

	it("Should have a tenth beacon matching onSendXHRPageGroup function based validation", function(done) {
		t.ifAutoXHR(
			done,
			function() {
				var b = tf.beacons[9];
				assert.equal(b["xhr.pg"], "XHRPageGroupSendPayload");
				done();
			},
			this.skip.bind(this));
	});

	it("Should have an eleventh beacon matching onSendXHRPageGroup function based validation with POST data", function(done) {
		t.ifAutoXHR(
			done,
			function() {
				var b = tf.beacons[10];
				assert.equal(b["xhr.pg"], "PageXHRPOST");
				done();
			},
			this.skip.bind(this));
	});

});
