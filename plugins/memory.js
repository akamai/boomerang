/*
 * Copyright (c), Log-Normal, Inc.
 */

/**
\file memory.js
Plugin to collect memory metrics when available.
see: http://code.google.com/p/chromium/issues/detail?id=43281
*/

(function() {
var w, p={}, d, m, s, n, b, impl;
// First make sure BOOMR is actually defined.  It's possible that your plugin is loaded before boomerang, in which case
// you'll need this.
BOOMR = BOOMR || {};
BOOMR.plugins = BOOMR.plugins || {};
if (BOOMR.plugins.Memory) {
	return;
}

function nodeList(type) {
	try {
		return d.getElementsByTagName(type);
	}
	catch(err) {
		BOOMR.addError(err, "Memory.nodeList." + type);
		return [];
	}
}

function errorWrap(condition, callback, component) {
	if(condition) {
		try {
			callback();
		}
		catch(err) {
			BOOMR.addError(err, "Memory.done." + component);
		}
	}
}

// A private object to encapsulate all your implementation details
impl = {
	done: function() {
		var res, doms={}, a;
		// If we have resource timing, get number of resources
		if(p && p.getEntriesByType && p.getEntriesByType("resource").length) {
			res = p.getEntriesByType("resource");
			BOOMR.addVar("dom.res", res.length);

			a = document.createElement("a");

			res.forEach(function(r) {
				a.href=r.name;
				doms[a.hostname] = true;
			});

			BOOMR.addVar("dom.doms", Object.keys(doms).length);
		}
		else {
			BOOMR.removeVar("dom.res");
		}

		if(m) {
			BOOMR.addVar({
				"mem.total": m.totalJSHeapSize,
				"mem.used" : m.usedJSHeapSize
			});
		}

		errorWrap(s,
			function() {
				BOOMR.addVar({
					"scr.xy": s.width + "x" + s.height,
					"scr.bpp": s.colorDepth + "/" + s.pixelDepth
				});
				if(s.orientation) {
					BOOMR.addVar("scr.orn", s.orientation.angle + "/" + s.orientation.type);
				}
				if(w.devicePixelRatio > 1) {
					BOOMR.addVar("scr.dpx", w.devicePixelRatio);
				}
			},
			"screen"
		);

		errorWrap(n,
			function() {
				if(n.hardwareConcurrency) {
					BOOMR.addVar("cpu.cnc", n.hardwareConcurrency);
				}
				if(n.maxTouchPoints) {
					BOOMR.addVar("scr.mtp", n.maxTouchPoints);
				}
			},
			"navigator"
		);

		errorWrap(b,
			function() {
				BOOMR.addVar("bat.lvl", b.level);
			},
			"battery"
		);

		BOOMR.addVar({
			"dom.ln": nodeList("*").length,
			"dom.sz": nodeList("html")[0].innerHTML.length,
			"dom.img": nodeList("img").length,
			"dom.script": nodeList("script").length
		});

		// no need of sendBeacon because we're called when the beacon is being sent
	}
};

BOOMR.plugins.Memory = {
	init: function() {
		var c;

		try {
			w = BOOMR.window;
			d = w.document;
			p = w.performance;
			c = w.console;
			s = w.screen;
			n = w.navigator;
			if(n.battery) {
				b = n.battery;
			}
			else if(n.getBattery) {
				n.getBattery().then(function(battery) {
					b = battery;
				});
			}
		}
		catch(err) {
			BOOMR.addError(err, "Memory.init");
		}

		m = (p && p.memory ? p.memory : (c && c.memory ? c.memory : null));

		// we do this before sending a beacon to get the snapshot when the beacon is sent
		BOOMR.subscribe("before_beacon", impl.done, null, impl);
		return this;
	},

	is_complete: function() {
		// Always true since we run on before_beacon, which happens after the check
		return true;
	}
};

}());

