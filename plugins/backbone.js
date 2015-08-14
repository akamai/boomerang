/*global Backbone*/
/*
* Installation:
*
* Before you call `Backbone.history.start()`, add the following code.
*
* Substitute `app.Router` in the two places below with your Backbone.Router instance.
*
* eg:
*     // ...Backbone startup..., eg. app.Router = Backbone.Router.extend({...});
*     var hadRouteChange = false;
*     app.Router.on("route", function() {
*       hadRouteChange = true;
*     });
*     function hookBackboneBoomerang() {
*       if (window.BOOMR && BOOMR.version) {
*         if (BOOMR.plugins && BOOMR.plugins.Backbone) {
*           BOOMR.plugins.Backbone.hook(app.Router, hadRouteChange);
*         }
*         return true;
*       }
*     }
*
*     if (!hookBackboneBoomerang()) {
*       if (document.addEventListener) {
*         document.addEventListener("onBoomerangLoaded", hookBackboneBoomerang);
*       } else if (document.attachEvent) {
*         document.attachEvent("onpropertychange", function(e) {
*           e = e || window.event;
*           if (e && e.propertyName === "onBoomerangLoaded") {
*             hookBackboneBoomerang();
*           }
*         });
*       }
*   }]);
*/
(function() {
	var hooked = false;

	if (BOOMR.plugins.Backbone || typeof BOOMR.plugins.SPA === "undefined") {
		return;
	}

	var impl = {
		enabled: false
	};

	// register as a SPA plugin
	BOOMR.plugins.SPA.register("Backbone");

	/**
	 * Bootstraps the Backbone plugin
	 *
	 * @param {Backbone.Router} router Backbone router
	 *
	 * @return {boolean} True on success
	 */
	function bootstrap(router) {
		if (typeof Backbone === "undefined" ||
			typeof router === "undefined") {
			return false;
		}

		// We need the AutoXHR and SPA plugins to operate
		if (!BOOMR.plugins.AutoXHR ||
		    !BOOMR.plugins.SPA) {
			return false;
		}

		/**
		 * Debug logging
		 *
		 * @param {string} msg Message
		 */
		function log(msg) {
			BOOMR.debug(msg, "backbone");
		}

		log("Startup");

		// Listen for the 'route' event on the Backbone Router, which is fired whenever a
		// route changes (i.e. a soft navigation, which is associated with the
		// URL in the address bar changing)
		router.on("route", function() {
			log("route");
			BOOMR.plugins.SPA.route_change();
		});

		return true;
	}

	//
	// Exports
	//
	BOOMR.plugins.Backbone = {
		init: function(config) {
			BOOMR.utils.pluginConfig(impl, config, "Backbone", ["enabled"]);
		},
		is_complete: function() {
			return true;
		},
		hook: function(router, hadRouteChange) {
			if (hooked || !impl.enabled) {
				return this;
			}

			if (bootstrap(router)) {
				BOOMR.plugins.SPA.hook(hadRouteChange);

				hooked = true;
			}

			return this;
		}
	};
}(BOOMR.window));
