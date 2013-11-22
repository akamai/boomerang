(function() {
var w = BOOMR.window,
    l = w.location,
    impl;

BOOMR = BOOMR || {};
BOOMR.plugins = BOOMR.plugins || {};

impl = {
	pageGroups: [],
	abTests: [],
	customTimers: [],
	customMetrics: [],

	complete: false,

	trim: function(str) {
		return str.replace(/^ +/, '').replace(/ +$/, '');
	},

	varHandlers: {
		cleanUp: function(s) {
			return o.replace(/[^\w -]+/g, '');
		},

		handleRegEx: function(re, extract, varname) {
			var value, m;

			try {
				re = new RegExp(re, "i");
			}
			catch(err) {
				BOOMR.debug("Error generating regex: " + err, "PageVars");
				return;
			}

			m = re.exec(l.href);

			if(!m || !m.length) {
				return;
			}

			value = extract.replace(
				/\$([1-9])/g,
				function(m0, m1) {
					return m[parseInt(m1, 10)];
				});

			value = this.cleanUp(value);

			BOOMR.addVar(varname, value);
		},

		Custom: function(o, varname) {
			var parts, value;

			BOOMR.debug("Got variable: " + o.parameter1, "PageVars");

			// Split variable into its parts
			parts = o.parameter1.split(/\./);

			if(!parts || parts.length === 0) {
				return;
			}

			// Top part needs to be global in the primary window
			value = w[parts.shift()];

			// Then we navigate down the object looking at each part
			// until:
			// - a part evaluates to null (we cannot proceed)
			// - a part is not an object (might be a leaf but we cannot go further down)
			// - there are no more parts left (so we can stop)
			while(value !== null && typeof value === "object" && parts.length) {
				BOOMR.debug("looking at " + parts[0], "PageVars");
				value = value[parts.shift()];
			}

			// parts.length !== 0 means we stopped before the end
			// so skip
			if(parts.length !== 0 || typeof value === "object") {
				return;
			}

			BOOMR.debug("final value: " + value, "PageVars");
			// Now remove invalid characters
			value = this.cleanUp("" + value);

			BOOMR.addVar(varname, value);
		},

		URLPattern: function(o, varname) {
			var value, re, params, i, kv;
			if(!o.parameter2) {
				return;
			}

			BOOMR.debug("Got URL Pattern: " + o.parameter1 + ", " + o.parameter2, "PageVars");

			// Massage pattern into a real regex
			o.parameter1.replace(/[^\.]\*/g, '.*');
			try {
				re = new RegExp("^" + re + "$", "i");
			}
			catch(err) {
				BOOMR.debug("Bad pattern: " + re, "PageVars");
				BOOMR.debug(err, "PageVars");
				return;
			}


			// Check if URL matches
			if(!re.exec(l.href)) {
				BOOMR.debug("No match on " + l.href, "PageVars");
				return;
			}

			// Now that we match, pull out all query string parameters
			params = l.search.split(/&/);

			BOOMR.debug("Got params: " + params, "PageVars");

			for(i=0; i<params.length; i++) {
				if(params[i]) {
					kv = params[i].split(/=/);
					if(kv.length && kv[0] === o.parameter2) {
						BOOMR.debug("final value: " + kv[1], "PageVars");
						value = this.cleanUp("" + kv[1]);
						BOOMR.addVar(varname, value);
						return;
					}
				}
			}
		},

		URLSubstringEndOfText: function(o, varname) {
			return this.URLSubstringTrailingText(o, varname);
		},

		URLSubstringTrailingText: function(o, varname) {
			BOOMR.debug("Got URL Substring: " + o.parameter1 + ", " + o.parameter2, "PageVars");

			this.handleRegEx("^"
						+ o.parameter1.replace(/[\W\S]/g, '\\$1')
						+ "(.*)"
						+ (o.parameter2 || "").replace(/[\W\S]/g, '\\$1')
						+ "$",
					"$1",
					varname);
		},

		Regexp: function(o, varname) {
			if(!o.parameter2) {
				return;
			}

			BOOMR.debug("Got RegEx: " + o.parameter1 + ", " + o.parameter2, "PageVars");

			this.handleRegEx(o.parameter1, o.parameter2, varname);
		}
	},

	isValid: function(o, handlers) {
		if(!o || typeof o !== "object" || !o.hasOwnProperty("definitionType")
		      || typeof varHandlers[o.definitionType] !== "function" || !o.parameter1) {
			return false;
		}
		return true;
	},

	done: function() {
		var i, o, t, varTypes = {"pageGroups": "h.pg", "abTests": "h.ab"};

		// Page Groups & AB Tests
		for(v in varTypes) {
			if(varTypes.hasOwnProperty(v)) {
				for(i=0; i<impl[v]; i++) {
					o = impl[v][i];

					if(isValid(o)) {
						this.varHandlers[o.definitionType](o, varTypes[v]);
					}
				}
			}
		}

		// Custom Metrics
		impl.run(impl.customMetrics)

		// Custom Time
		impl.runTimer(impl.customTimers);
	}
};


BOOMR.plugins.PageParams = {
	init: function(config) {
		var properties = ["pageGroups", "abTests", "customTimers", "customMetrics"];

		BOOMR.utils.pluginConfig(impl, config, "PageParams", properties);


		return this;
	},

	is_complete: function() {
		return impl.complete;
	}
};

})();
