# Boomerang Release Notes

## 1.815.1 (Aug 15, 2025)

### Bug Fixes

* `package.json`: Removes `postinstall` NPM step so `npm install boomerangjs` succeeds without dev dependencies

## 1.815.0 (Sep 30, 2024)

### New Features

* Boomerang: Initial Prerendered Support: The following durations will be offset by the Activation Start time (when the user clicked to view the prerendered page):
  * First Paint (FP) `pt.fp`
  * First Contentful Paint (FCP) `pt.fcp`
  * Largest Contentful Paint (LCP) `pt.fcp`
  * Time to Interactive (TTI) `c.tti`
  * Time to First Interaction (TTFI) `c.ttfi`
  * Back-End Time `t_resp`
  * Front-End Time `t_page`
  * Page Load Time `t_done`
  * There are more timers that will need to be offset, and work will continue in future versions.

## 1.803.0 (March 7, 2024)

### Bug Fixes

* Issue 1190: SPA: Only append OriginTrials if document.head.append is available
* Issue 1189: BW: Change default HTTPS behaviour of bandwidth test to "run"
* Issue 1187: BFCache: Set Page Dimensions: Page Group, AB, Custom Dimensions
* Issue 1185: Continuity: Ignore errors from Battery API
* Issue 1183: History: Clarify documentation about routeChangeWaitFilter
* Issue 1182: AutoXHR: Do not wait for unchanged resources contained in a node element
* Issue 1181: Continuity: Include zero CLS values on beacon
* Issue 1176: PaintTiming: Use URL from LCP object directly if available, skip data: URIs

### Misc

* Issue 1179: Docs: 1.792 Release Notes

## 1.792.0 (October 23, 2023)

### New Features

* Issue 1167: SPA: Soft Navigation Heuristics

### Bug Fixes

* Issue 1175: BFCache: Only append OT if document.head.append is available
* Issue 1172: BFCache: Round timestamps to avoid microsecond timing differences
* Issue 1171: History: Don't reset a SPA route change for XHR beacons

### Misc

* Issue 1170: Docs: 1.785 Release Notes
* Issue 1174: Tests: Ensure HTTPS-requiring tests alert if not on HTTPS; Loosen required timings

## 1.785.0 (July 17, 2023)

### Breaking Changes

* Boomerang now measures Back-Forward Cache (BFCache) navigations, resulting in an additional beacon for each BFCache nav.  You can stop this behavior by disabling the `BFCache` plugin.  See the plugin for details on more configuration options.

### New Features

* Issue 1148: EventTiming: Add target to EventTiming information captured
* Issue 1161: ResourceTiming: Add initiator types `early-hints`, `ping`, `font`
* Issue 1164: BFCache: BFCache plugin added

### Bug Fixes

* Issue 1154: EventTiming: Fix 'Object.values is not a function' warning
* Issue 1162: AutoXHR: Add support for SVGAnimatedString
* Issue 1149: ConsentInline: Making the ConsentInline plugin compatible with Boomerang in SPA mode
* Issue 1156: PaintTiming: Updated listeners and LCP data population conditions to handle Error & Early beacons
* Issue 1160: Errors: Allow override and disabling of sending interval during page load for error beacon
* Issue 1166: Boomerang: Run `localStorage.removeItem` in the finally block
* Issue 1158: SPA: Ensure `spa_navigation` event has correct `requestStart` time
* Issue 1168: PaintTiming: Disconnect LCP observer after sending LCP on Page Load
* Issue 1152: SPA: Lint: Fix incorrectly globally exported variable

### Misc

* Issue 1147: Lint: Added new lint rules (changed tabs to spaces)
* Issue 1150: Tests: Code coverage for unit and end-to-end tests
* Issue 1159: Lint: Added `spaced-comment` rule
* Issue 1157: Docs: Update to 1.766; Improve Continuity docs for FID
* Issue 1163: Docs: Misc docs cleanup
* Issue 1152: Tests: Allow-list in existing globals added per-test
* Issue 1139: Tests: Update timing checks to be more reliable in Docker tests
* Issue 1169: Tests: Fix test issues

## 1.766.0 (October 10, 2022)

### New Features

* Issue 1129: EventTiming: Interaction to Next Paint (INP) support
* Issue 1135: Continuity: Add supporting data for LCP and CLS
* Issue 1136: ResourceTiming: Add nextHopProtocol to resource timing data
* Issue 1132: Boomerang: Don't listen for beforeunload if pagehide is supported; Added `no_unload` option
* Issue 1138: Boomerang: Support collecting High Entropy Client Hints
* Issue 1137: SPA: Include timing data in `spa_init` and `spa_navigation` events
* Issue 1127, 1128: Boomerang: Support for User Agent Deprecation, read `navigator.userAgentData` and avoid `navigator.userAgent` and `navigator.platform`

### Bug Fixes

* Issue 1131: ResourceTiming: Don't add data to Unload beacons.  Memory: Only add data to Page Load beacons.
* Issue 1140: ResourceTiming: Remove timepoints calculations
* Issue 1121: Continuity: Disable Page Busy polling for Firefox
* Issue 1125: PaintTiming: Only include `pt.lcp.src` and `pt.lcp.el` on the `pt.lcp` beacon
* Issue 1142: EventTiming: Ensure timestamps and durations are rounded to nearest ms
* Issue 1143: EventTiming: Add additional serialized event mappings
* Issue 1145: EventTiming: interactionToNextPaint() API should return the latest
* Issue 1144: Continuity: Don't add c.cls.d or c.cls.topid if there were no CLS
* Issue 1146: RT: Don't update cookie on beacon_url change

### Misc

* Issue 1119: Tests: Fix many Docker failures, Remove PhantomJS, fix Dockerfiles
* Issue 1130: Build: Strip [BOOMR.info](http://BOOMR.info), .warn, .error on production builds
* Issue 1141: Docs: Memory's dev.mem

## 1.750.0 (May 30, 2022)

### Bug Fixes

* Issue 1120: SPA: Always trigger `spa_navigation` event for each new navigation
* Issue 1122: Continuity: Fix Hero Image timing detection in Firefox
* Issue 1123: Continuity: Include First Input Delay on the beacon when it is 0ms

### Misc

* Issue 1118: Docs: Version History update for `1.747.0`
* Issue 1124: Tests: Fixes for `12-react/108-hard-nav-disable`

## 1.746.0 (February 22, 2022)

### New Features

* Issue 1108: PaintTiming: Add reporting for element and source URL for LCP
* Issue 1113: Memory: Add support for collecting `navigator.deviceMemory` as `dev.mem`

### Bug Fixes

* Issue 1116: AutoXHR: Avoid re-wrapping XHR/fetch during config refreshes

### Misc

* Issue 1106: Tests: Allow setting `--config-path` from `environments.json`
* Issue 1107: Loader Snippet: Reduced support for IE8, use `script src` instead of `doc.write` in IFRAME
* Issue 1109: Misc sync with Akamai 2021 Q2 OS branch backport
* Issue 1114: Docs: Disable deep package path publishing for jsdoc generation
* Issue 1115: Docs: Copyright notice update

## 1.737.0 (Apr 16, 2021)

### New Features

* Issue 1102: AutoXHR: Allow SPA to start from clicks
* Issue 1072: SPA: Option to apply Wait Filter for Hard Navs
* Issue 1099: AutoXHR: Ignore `opacity:0`, 0px-dimension DOM elements, custom filters
* Issue 1092: Build: Support for build flavors

### Bug Fixes

* Issue 1096: Unblock Early beacon during missed SPA Hard Nav
* Issue 1078: Boomerang: Always ensure Session Length is at least 1

### Documentation

* Issue 1090: Doc: Loader Snippet Known Issues and other JSDoc changes

## 1.725.0 (November 3, 2020)

### Breaking Changes

* Boomerang will no longer send an "XHR Beacon" when an `XMLHttpRequest` **does not** result in any interesting DOM modifications (i.e. no  new images, stylesheets, IFRAMEs or other XHRs were added).  This change can be reverted to the previous behavior (of still sending an XHR Beacon) by setting the `AutoXHR.xhrRequireChanges=false` flag.

### Bug Fixes

* Issue 868: AutoXHR: Don't send XHR beacons if there were no DOM mutations
* Issue 1081: AutoXHR: Don't wait on lazy-loaded images
* Issue 1079: AutoXHR: For XHR beacons that happen before Page Load, ResourceTiming data is properly added to the XHR beacon when it is fired
* Issue 1077: Continuity: Only add Time To Visually Ready (TTVR) to the Page Load beacon
* Issue 1082: Memory: Avoid loop in Memory plugin for some pages
* Issue 1087: EventTiming: Observe entries from top-level frame (e.g. for First Input Delay)
* Issue 1073: ResourceTiming: Include the Boomerang and Config URL (for mPulse)

## 1.720.0 (July 29, 2020)

### Bug Fixes

* Issue 1075: Boomerang: Added support for SameSite and Secure cookie attributes

## 1.715.0 (June 26, 2020)

### Bug Fixes

* Issue 1069: History: Correctly forward arguments to `routeFilter`

### Documentation

* Issue 1069: Docs: Release notes updated
* Issue 1069: Docs: Continuity Cumulative Layout Shift docs
* Issue 1069: Docs: Added additional Back-end Servers and integration guides

## 1.711.0 (June 8, 2020)

### Bug Fixes

* Issue 1062: EventTiming: Change `firstInput` type to `first-input` per spec change

## 1.710.0 (May 6, 2020)

### Breaking Changes

* Issue 1057: Errors: The `monitorEvents` and `monitorTimeout` options are now disabled by default.  As a result, some cross-origin JavaScript
  Errors may not report the full message (and instead will only show `Script Error.`), and the stack will not be available.
  Please see the Errors plugin documentation for details on the side-effects of re-enabling those options.
* Issue 1051: Continuity: First Input Delay calculations have changed slightly.  The plugin will now use the Event Timing plugin
  (if available and the browser supports it) for First Input Delay calculation.  If not, `mousedown`, `touchstart` and
  `pointerdown` events are now used for First Input Delay calculations, while Scroll, Visibility and Orientation changes
  are not.  Only cancelable events are now tracked.  First Input Delay should be more accurate, though there may be less
  overall measurements (due to not tracking Scroll for First Input).

### New Features

* Issue 1000: Event Timing plugin (enabled by default)
* Issue 1044: ResourceTiming: Service Worker timing capture at resource level
* Issue 1049: PaintTiming: Expose Largest Contentful Paint via `BOOMR.plugins.PaintTiming.metrics.lcp()`

### Bug Fixes

* Issue 1047: Continuity: Scroll Log: Trim decimals

### Documentation

* Issue 1056: Docs: Include minified snippets in built documentation
* Issue 1056: Docs: Add Header Snippets section
* Issue 1046: Docs: Fixed reference from `c.t.lt` to `c.t.longtask`
* Issue 1048: Boomerang: Document additional beacon vars

### Tests

* Issue 1053: Tests: Ensure /delay path roots requested files to wwwRoot

## 1.700.0 (January 29, 2020)

### New Features

* Issue 1027: PaintTiming: Largest Contentful Paint
* Issue 1030: Consent Inline Plugin and Docs
* Issue 1040: Continuity: Add the ability to track Cumulative Layout Shift

### Bug Fixes

* OS Issue 251: Add support for background image detection for `c.tti.hi`
* OS Issue 261: NPM: Allow running grunt build
* Issue 990: SPA: Only subtract SPA timeout when the timeout fires
* Issue 1026: Update Snippet to have its own reference to the parentNode

## 1.687.0 (October 10, 2019)

### New Features

* Issue 1019: Boomerang: Replace MD5 with FNV for better performance

### Bug Fixes

* OS Issue 273: `rt.si` not working as expected
* OS Issue 275: UserTiming: Update `usertiming-compression` package to latest version
* Issue 1020: RT: Error wrapping when we have `NS_ERROR_FAILURE` for Firefox 31
* Issue 1021: AutoXHR: Handle removing `src` attribute from monitored resource

## 1.681.0 (September 11, 2019)

### Bug Fixes

* Issue 823: History SPA v2
* Issue 1001: Continuity: Don't track interaction times in Safari if loaded in iframe
* Issue 998: Docs: Document `rt.si`, `rt.ss`, `rt.sl`, `rt.tt`, `rt.obo`
* Issue 997: ResourceTiming: Disable `srcset` physical dimension collection by default
* Issue 1003: Continuity: Turn `monitorStats` off by default
* Issue 987: Memory: Add support for `navigator.connection.saveData`
* OS Issue 197: Navigation Timing: Plugin sends twice per page
* Issue 1005: Continuity: Don't disable collection when API beacons are sent

## 1.672.0 (August 22, 2019)

### Bug Fixes

* Issue 999: RT: Cleanup beacon parameter cleanup

## 1.669.0 (June 28, 2019)

### Bug Fixes

* Issue 992: Errors: Ensure `message.indexOf` is a function
* Issue 993: Early Beacon: Fix for SPA events

## 1.667.0 (June 12, 2019)

### New Features

* Issue 637: Early Beacons

### Bug Fixes

* Issue 976: AutoXHR: XHR abort status fix for FireFox
* Issue 980: Memory: Remove reference to BatteryManager API as this API is obsolete
* Issue 812: ResourceTiming: More initiatorTypes
* Issue 983: NavigationTiming: Don't use `chrome.loadTimes()` when there are no paints
* Issue 982: Boomerang: Fix empty-beacon check
* Issue 939: Optimize cookie access
* Issue 991: Continuity: ceil duration times
* Issue 990: Boomerang: Don't set cookie if domain is null, fallback to current

## 1.650.0 (May 14, 2019)

### New Features

* Issue 782: Boomerang Loader Snippet v12
* Issue 966: History: Add config option to disable monitoring of `replaceState`

### Bug Fixes

* Issue 969: AutoXHR: Make `routeChangeWaitFilter` `wait_complete` calls wait for other pending nodes
* Issue 972: IFrameDelay: Listen for `postMessage` calls on the correct window
* Issue 973: LOGN: Use HTTP for XDomainRequest for IE8-10 if on HTTP site

### Docs

* Issue 968: Continuity: Document events for TTFI

### Tests

* Issue 975: IFrameDelay: Force tests to load Boomerang in an IFRAME when using the snippet
* Issue 974: Grunt: Allow specifying multiple webdriver-version

## 1.643.0 (April 9, 2019)

### Performance Improvements

* Issue 933: Performance: Boomerang Performance Tests
* Issue 936: Performance: Strips out `BOOMR.debug` and related messages for production builds
* Issue 937: Performance: Grunt: Use UglifyJS-3
* Issue 953: Performance: ResourceTiming: Allow for non-optimal Trie to improve performance

### Bug Fixes

* Issue 941: AutoXHR: Track uninteresting timeout per event instead of per page
* Issue 931: AutoXHR: Cleanup listeners on observed nodes
* Issue 947: AutoXHR: Track Fetch the same way as XHR during SPA navigations
* Issue 946: AutoXHR: Track `LINK` stylesheets as interesting nodes
* Issue 943: AutoXHR: Add XHRs to pending events at send instead of load finished
* Issue 947: AutoXHR: Include Fetch requests in SPA backend time
* Issue 952: Boomerang: Ensure only a single beacon is being sent at once
* Issue 959: IFrameDelay: Gracefully handle different load orders

## 1.630.0 (January 15, 2019)

### Bug Fixes

* Issue 928: SPA: Ignore route changes if a `routeChangeWaitFilter` has not yet completed
* Issue 929: History: Ignore `replaceState()` if a SPA nav is in progress and no URL change
* Issue 930: SPA: Only apply `routeFilter` and `routeChangeWaitFilter` on SPA Soft Navigations

## 1.629.0 (December 3, 2018)

### Bug Fixes

* Issue 906: Cleanup leaked global vars
* Issue 907: Added `.npmignore` for OS NPM package
* Issue 908: README: Notes on download / npm / bower
* Issue 910: TPAnalytics: Add data to `spa_hard` beacons
* Issue 913: UserTiming: Update to vanilla `UserTimingCompression`
* Issue 923: Boomerang: Keep track of all unload handlers to know when to send unload
* Issue 925: AutoXHR: Don't track `<SCRIPT>` tags for XHR beacons
* OS Issue 196: Optionally depend on `usertiming-compression`
* OS Issue 218: Boomerang: Optionally send XHR with credentials
* OS Issue 219: Clicks: Fix plugin config
* OS Issue 220: SPA: Clarify `route_change` comment
* OS Issue 221: Tests: Move `webdriver-manager` from `package.json` install script to tests
* OS Issue 223: JSDoc: Clarify SPA plugin load-order requirements
* OS Issue 224: Fix issue related to screen orientation in iPhone and iPad
* OS Issue 231: Add missing bracket after "Observer effect" link
* OS Issue 236: Continuity: Update documentation of beacon parameters

## 1.626.0 (November 12, 2018)

### Bug Fixes

* Issue 905: Errors / AutoXHR: Un-register wrapped functions at unload
* Issue 903: SPA: Make markNavigationComplete only apply to SPA events

## 1.624.0 (November 2, 2018)

### Bug Fixes

* Issue 892: Errors: Timing issue causing page load beacon to get tagged with the error type initiator marker
* Issue 899: AutoXHR: Try to use native MutationObserver when running on a page with Zone.js

## 1.621.0 (October 24, 2018)

### New Features

* Session tracking via cookies
* Issue 890: Errors: Support Reporting API warnings
* Issue 840: Errors: Monitor Unhandled PromiseRejectionEvents

### Bug Fixes

* Issue 886: Errors: Allow `onerror` to be called with an `ErrorEvent` object
* Issue 893: Continuity: Disable `MutationObserver` usage for `monitorStats` for IE11
* Issue 895: AutoXHR: Don't track pixels or IFRAMEs that change `src`
* OS Issue 206: Fallback to use XHR if data store requires auth
* OS Issue 211: Fix `getBeaconURL()` error using AutoXHR plugin

## 1.615.0 (September 25, 2018)

### Bug Fixes

* Issue 879: Protect against undefined `nodeName`
* Issue 877: Boomerang: Add beacon number param
* Issue 769: NavTiming: Don't look at `chrome.loadTimes()` if `nextHopProtocol` is empty
* Issue 883: Cookie Compression

## 1.612.0 (September 18, 2018)

### Bug Fixes

* Issue 869: PaintTiming: Don't add FP/FCP if document is hidden or for SPA Soft/XHRs
* Issue 873: Continuity: Don't fail if Screen Orientation API is not supported
* Issue 876: Boomerang: Don't use polyfilled `sendBeacon()`

## 1.609.0 (August 29, 2018)

### Bug Fixes

* Issue 847: Don't use the `navigator.sendBeacon` API when `beacon_type` is set to `GET`
* Issue 853: Verify that the Battery value is a valid number before adding it to the beacon
* Issue 864: SPA: Fix regression in SPA timings with `disableHardNav`
* Issue 865: AutoXHR: Fix regression in XHR monitoring for non-NT browsers
* Issue 866: AutoXHR: don't mistakenly clear `monitorFetch` flag
* Issue 863: AutoXHR: `alwaysSendXhr` accepts a function or list of strings/regexs

## 1.602.0 (August 17, 2018)

### Bug Fixes

* Issue 858: Fix `localStorage` expiry time
* Issue 854: Run page ready only after config arrives
* Issue 861: If the cookie is set to null, `rt.si`, `rt.sl`, `rt.ss`, should not be written

## 1.598.0 (July 27, 2018)

### New Features

* Issue 851: EXPERIMENTAL: AutoXHR: Delay checking RT if fetch response body is not used

### Bug Fixes

* Issue 850: EXPERIMENTAL: AutoXHR: Do not instrument polyfilled fetch API

### Tests

* Issue 841: Remove CT16 'slowest' from Resource Groups

### Docs

* Issue 820: ResourceTiming: JSDoc fixes

## 1.593.0 (July 23, 2018)

### New Features

* Issue 824: EXPERIMENTAL: AutoXHR: Add Fetch API instrumentation

### Bug Fixes

* Issue 843: AutoXHR: Handle XHRs that are aborted after `readyState` 4
* Issue 844: SPA: Fixes URL for SPA navigations after XHR beacons

## 1.590.0 (July 16, 2018)

### New Features

* Issue 813: Add cookie length and `localStorage` length as beacon parameters
* Issue 818: Trap `clearResourceTimings()`

### Bug Fixes

* Issue 835: Protect access to `localStorage` variable
* Issue 838: AutoXHR: Only save XHR request and response payloads if configured to
* Issue 817: Replace undefined parameter values with empty string in beacon query
* OS Issue 198: Fix `TypeError: undefined is not an object`

### Tests

* Issue 828: Test server: Add support for customizable status codes in all cases
* Issue 802: Test fixes for test #111096
* Issue 839: Clean `sessionStorage` in e2e tests
* Issue 842: Fix for `11-restiming/12-clearResourceTiming`

### Docs

* Issue 830: Continuity: Docs update for missing parameters
* Issue 836: Docs for Boomerang Tests

## 1.579.0 (May 7, 2018)

### New Features

* Issue 792: Use currentSrc for images (`PICTURE` support)
* Issue 814: `SVG:IMAGE` and `srcset` support for Continuity Hero Images

### Bug Fixes

* Issue 809: Errors: unbound `removeEventListener`
* Issue 750: History: react to `popstate` events and allow aborted beacons

## 1.571.0 (April 10, 2018)

### New Features

* Issue 528: Continuity plugin

### Bug Fixes

* Issue 804: OS Repo sync and fixes 2018
* Issue 801: Add array bounds check to `getQueryParamValue()`
* Issue 790: ResourceGroups: Run at same time as other handlers instead of at `before_beacon`
* Issue 793: Boomerang: Ensure we don't `console.log` a `BOOMR.debug` message in production
* Issue 805: Continuity: Fix busy calculation for late periods
* Issue 775: Errors: Check context in `wrapFn`
* Issue 777: Errors: Call `removeEventListener` before `addEventListener`
* Issue 784: `getMyURL()` fix for PhantomJS 1
* Issue 776: Correctly detect our url on IE using non-standard loader
* Issue 799: Move `alwaysSendXhr` into the `pluginConfig` section to make it clearer that this is an AutoXHR config

## 1.566.0 (March 21, 2018 - restricted use)

### New Features

* Issue 759: Update to new server timing header syntax

### Bug Fixes

* Issue 774: Disable `MutationObserver` in IE 11 due to browser bugs
* Issue 761: Prevent unload confirmation popup in tests
* Issue 772: Make self url detection work when loaded in primary window as well
* Issue 756: Errors: Support capture flag in options object passed in

### Tests

* Issue 752: Upgrade `express-middleware-server-timing`
* Issue 771: Edge, IE and Safari e2e test support
* Issue 737: Headless modern browser support (Chrome + Firefox)
* Issue 768: Improve `localStorage` tests
* Issue 767: Revive the SauceLabs code
* Issue 751: Gruntfile: Split apart build steps

## 1.552.0 (February 9, 2018)

### New Features

* Issue 748: PaintTiming plugin; NavTiming: Deprecate `chrome.loadTimes()`

## 1.543.0 (January 25, 2018)

### New Features

* Issue 728: Override the load end-time with `BOOMR_page_ready` or a param to `BOOMR.page_ready()`

### Bug Fixes

* Issue 726: NavTiming: Fix `nt_nav_type`
* Issue 726: Boomerang: Add timeout to `requestIdleCallback` in `BOOMR.setImmediate`
* Issue 726: AutoXHR: fix for `IMGs` with changing `src`
* Issue 726: NavTiming: Get `msFirstPaint` only from `performance.timing`
* Issue 726: AutoXHR: When a SPA Hard beacon is ready but `onload` hasn't fired, run after other `onload` handlers
* Issue 738: Configuration for locking `beacon_url` to specific patterns
* Issue 730: Compare marks/measures to `performance.now` mark
* Issue 727: Navtiming: Fix `nt_nav_st`
* Issue 723: CrossDomain: Disable if URL is blank or whitespace
* Issue 722: Work around minification that breaks in IE8 and quirks mode
* Issue 718: Errors: Wrap `addEventListener` at the end of the protocol chain

## 1.532.0 (December 18, 2017)

### Bug Fixes

* Issue 714: Fix Custom Timers for SPA navigations
* Issue 699: NavigationTiming: Don't include timestamps for events that haven't happened

## 1.527.0 (December 12, 2017)

### New Features

* Issue 695: `BOOMR.sendAll()`

### Bug Fixes

* Issue 701: CrossDomain: Validate cross-domain URL
* Issue 710: Workaround for `document.write` changing readyState after `onload`

## 1.522.0 (November 10, 2017)

### Bug Fixes

* Issue 693: Add `BOOMR.utils.arrayFind` (fixes ResourceTiming in IE11)
* Issue 696: Better string checking for Boolean Custom Metrics
* Issue 700: Capture `BOOMR.page_ready()` time after `onload`; `BOOMR.addVar()` for single beacons

## 1.517.0 (October 20, 2017)

### New Features

* Issue 635: ServerTiming support

### Bug Fixes

* Issue 691: XHR Filtering: Fixes for match option
* Issue 686: Force beacons to HTTPS
* Issue 670: Handle latest netinfo spec
* Issue 671: Add `nocookie` flag if we couldn't set cookies
* Issue 678: Resource Groups: Fixes for IE 10
* Issue 685: ResourceTiming: Add `iframe` and `subdocument` to `initiatorType`
* Issue 683: CrossDomain: Abort when cross-domain URL isn't specified

## 1.511.0 (September 7, 2017)

### Bug Fixes

* Issue 621: CrossDomain: Reliability fixes
* Issue 665: AutoXHR: Wait once up to 1,000ms after an uninteresting mutation
* Issue 666: `SPA.markNavigationComplete()` support

## 1.506.0 (August 30, 2017)

### Bug Fixes

* Issue 663: AutoXHR: If we don't instrument XHR `open()` due to exclude filter then don't instrument `send()`
* Issue 664: AutoXHR: Do not extend the event timeout with each uninteresting mutation

## 1.500.0 (August 15, 2017)

### Bug Fixes

* Issue 602: SPA: Aborted load beacons
* Issue 647: RT: Fix `t_page` and `t_resp` missing from the beacon
* Issue 648: RT: Always use `loadEventEnd` as the end load time

## 1.495.0 (July 24, 2017 - restricted use)

### Bug Fixes

* Issue 598: NavigationTiming: Add a few NavigationTiming2 fields if available
* Issue 599: ResourceGroup: Support for SPA navigations
* Issue 614: ResourceGroups: Match all CSS selector elements instead of just first one

## 1.489.0 (July 7, 2017 - restricted use)

### Bug Fixes

* Issue 624: `BOOMR.sendMetric/Timer`: Include `rt.end`
* Issue 633: `BOOMR.sendMetric/Timer`: Append session start time to `rt.si`

## 1.486.0 (June 16, 2017)

### Bug Fixes

* Issue 610: BOOMR.log: Add timestamp
* Issue 612: SPA: Don't send beacons for SPA soft navs that don't change the URL and no resources are triggered
* Issue 608: ResourceTiming: Additional checks and fixes for non-supported browsers
* Issue 607: ResourceTiming: If there are no entries, ensure the parameter is `{}`
* Issue 609: Angular: Don't trigger Route Change on `$locationChangeStart` if other events fire
* Issue 618: `BOOMR.sendTimer/sendMetric`: Set the location so dimensions work properly

## 1.483.0 (May 15, 2017)

### Bug Fixes

* Issue 594: AutoXHR: Don't wait for XHRs that `.open()` but don't `.send()`
* Issue 579: `BOOMR_mq` method queue
* Issue 588: Add support for delaying `page_load` beacon with instrumented iframes
* OS Issue 139: ResTiming: Resource type filter

## 1.479.0 (May 12, 2017)

### Bug Fixes

* Issue 591: `sendBeacon`: `x-www-form-urlencoded`

## 1.477.0 (May 11, 2017 - restricted use)

### Bug Fixes

* Issue 586: Don't report IE error for freed script in event and timeout handlers
* Issue 585: Angular: Track navigations when only a `$locationChangeStart` fires
* Issue 587: Miscellaneous cleanup
* Issue 577: Warn on window and document overrides (debug builds only)
* Issue 583: Don't send boomerang error on `TPAnalytics` third party errors
* Issue 559: Errors: Loader Snippet to capture errors before Boomerang arrives
* Issue 561: Errors: Re-throw caught exceptions
* Issue 563: `BOOMR.sendTimer()` / `BOOMR.sendMetric()` and `sendBeacon()` support
* Issue 582: UserTiming disabled by default
* Issue 581: Add `usertiming` feature flag
* OS Issue 77: Plugin to beacon User Timing API mark and measure entries
* Issue 562: Minor fixes to sync with OS repo
* OS Issue 138: Make the errors plugin work without the Compression plugin

## 1.463.1493220061 (April 26, 2017)

### Bug Fixes

* Issue 570: History: Option to disable hard navigation in favor of `BOOMR.page_ready()`
* Issue 560: Errors: Include dimensions (page groups, AB, custom) on error beacons
* Issue 558: Errors: Send during `onload` if `autorun=false`
* Issue 564: AutoXHR: Fixes XHR after click missing beacon
* Issue 567: Update copyrights

## 1.452.1492175627 (April 14, 2017)

### Bug Fixes

* Issue 556: Deduplicate calls to `addEventListener()` with the same arguments

## 1.451.1491334204 (April 4, 2017)

### Bug Fixes

* Issue 555: Ensure we don't clobber `cross_domain_url` if it has a query param already
* Issue 557: AutoXHR: Only capture `reponseText` or `responseXML` if the type is set

## 1.449.1490889765 (March 30, 2017)

### Bug Fixes

* Issue 553: Prevent Errors plugin from accessing a function of a potentially undefined error message
* Issue 547: Only use `performance.now()` if it is a native function
* Issue 554: Replace `isArray` with `hasOwnProperty` check for backward compatibility
* Issue 551: Remove calls for timepoint calculations

## 1.446.1490635326 (March 27, 2017)

### Bug Fixes

* Issue 549: Fix typo in NavigationTiming (push of `undefined`)

## 1.445.1489625641 (March 15, 2017)

### Bug Fixes

* Issue 525: Grunt: Re-run specific tasks
* Issue 531: Check that `scrollX` & `scrollY` are numbers
* Issue 532: Make sure `n.getBattery` is a function before calling it
* Issue 537: ResourceTiming: Ignore IE's `res:` urls
* Issue 536: Add `downlinkMax` for browsers that support it.
* Issue 533: ResourceTiming: Exports `.addResourceTimingToBeacon()`
* Issue 524: Warn on buggy `responseEnd`
* Issue 538: Normalize `cross_domain_url`
* Issue 535: Add support for `requestIdleCallback()`
* Issue 542: Gruntfile: Uglify `debug-test-min` after applying templates
* Issue 529: Add ResourceTiming timepoints
* Issue 526: History bugs and XHR beacon handling changes
* Misc: Jump to newer versions of eslint so that jenkins matches reality

## 1.435.1487783301 (February 22, 2017)

### Bug Fixes

* Issue 520: Test fix
* Issue 521: Bind `forEach` contexts this to calling `mutationHandler` instance context

## 1.432.1486768074 (February 10, 2017)

### Bug Fixes

* Issue 509: Adds Page ID and refactored random ID generation
* Issue 513: XHR fixes when ResourceTiming is available
* Issue 515: SPA Hard: Use `navigationStart` instead of `fetchStart` for start time
* Issue 516: SPA navigations: Remove timers from hard nav
* Issue 517: Remove `rt.sh` and `rt.srst` (Session History debug)
* Issue 519: CrossDomain: Ensure a beacon is sent, wait up to 5s for timeout
* Issue 371: Handle SVG IMAGE types
* Issue 495: Add support for PageGroups based XHR Instrumentation filters
* Issue 348: Count unique urls in `dom.img` and `dom.script`
* Issue 455: `t_page < 0` on some SPA beacons
* Issue 518: Protect against browser bugs for `t_page` and `t_resp`

## 1.429.1485448661 (January 26, 2017)

### Bug Fixes

* Issue 456: Errors: Filter boomerang functions from stack in minified version
* Issue 508: Errors: `Errors.wrap`: Run `BOOMR_check_doc_domain` first

## 1.426.1484362995 (January 13, 2017)

### Bug Fixes

* Issue 496: ESlint: Enable `space-in-parens`
* Issue 499: boomerang: Fix XHR Authorization check

## 1.423.1483643196 (January 5, 2017)

### Bug Fixes

* Issue 479: Prevent XHR Beacons before SPA Hard if `alwaysSendXHR` not enabled
* Issue 481: SPA: Don't enable `MutationObserver` / `AutoXHR` until asked to
* Issue 483: Capture Adobe `s.purchaseID` var
* Issue 482: Add support for PageGroups based on XHR Payload
* Issue 485: Use Boomerang IFRAME XHR as backup if window XHR fails
* Issue 491: Add support for Custom Filters in AutoXHR
* Issue 497: Ensure `removeChild()` is only called when iframe exists, ensure `indexOf()`
* Issue 498: Move origin check up before parsing JSON
* Misc: Updated mocha dependency
* Misc: Update README to account for changed build procedure
* OS Issue 112: `POST` & Auth Token Support

## 1.413.1477614597 (October 27, 2016)

### Bug Fixes

* Issue 470: SPA: Recalculate SPA Hard timings before capturing ResourceTiming
* Issue 471: ResourceTiming: Ensure entries are sorted correctly so all are captured
* Issue 476: Add `rt.nstart` to to beacon
* Issue 477: Avoid IE10 / IE11 bug with `MutationObserver` and `XHR.responseXML`

## 1.407.1476482714 (October 14, 2016)

### New Features

* Issue 428: Support for Resource Groups

### Bug Fixes

* Issue 465: SPA Hard navigation timing calculation changes

## 1.405.1475087321 (September 28, 2016)

### Bug Fixes

* Issue 451: Session length incrementing for XHR subresource beacons before `onload`
* Issue 452: Session length incrementing for Boomerang in IFRAME when `autorun=false`
* Issue 453: `scrollX` and `scrollY` undefined in IE
* Issue 477: Ensure window is available when sending a Beacon

## 1.402.1473440808 (September 9, 2016)

### Bug Fixes

* Issue 434: Boomerang: Wrap `dispatchEvent()` / `fireEvent()` in `try/catch`
* Issue 440: AutoXHR: Improve tracking with multiple outstanding XHRs
* Issue 443: TPAnalytics: Skip calling `ga.getAll()` if it's not a function

## 1.400.1470878703 (August 10, 2016)

### Bug Fixes

* Issue 412: BOOMR.now was always using `Date.now`
* Issue 413: Allow `XMLHttpRequest.open()` twice
* Issue 427: Add `errors-monitor-other` feature
* Issue 429: Support Classic GA and named trackers
* Issue 430: Fix xhr negative `t_page` in prerender
* Issue 431: Ensure our `MutationObserver` is created in the page's context, not our IFRAME

## 1.399.1469784094 (July 29, 2016)

### Bug Fixes

* Issue 416: Fixes capturing of ResourceTiming2 sizes
* Issue 418: Sanity check Image works before using to send a beacon
* Issue 419: Ensure `r` and `r2` parameters are redacted
* Issue 420: Do not send Third Party Analytics client IDs if disabled in config
* Issue 421: Errors limit the maximum captured stack length
* Issue 422: AutoXHR: Click events should always use the URL of the fetched resource
* Issue 423: Errors: `monitorConsole` bug fixed

## 1.394.1467954210 (July 7, 2016)

### Bug Fixes

* Issue 400: Wraps `removeEventListener()` to work with the wrapped functions

## 1.390.1467244673 (June 29, 2016)

### New Features

* Issue 351: Cross-domain session tracking support
* Issue 388: ResourceTiming: Allow a list of URLs to trim all data from (e.g. analytics beacons)
* Issue 391: TPAnalytics: Add support for IBM Site Promotion Analysis and Real Estate Analysis

### Bug Fixes

* Issue 363: Fixes bug with duplicate XHR URLs returning incorrect timing
* Issue 385: Fix for Errors plugin with `setInterval()` using string parameters
* Issue 372: ResourceTiming no longer tracks beacon URLs
* Issue 386: ResourceTiming fixes bugs for browsers that have NT but no RT support
* Issue 389: Fix missing data on pre-rendered pages when another beacon is sent before

## 1.381.1463423250 (May 16, 2019)

### New Features

* Issue 359: TPAnalytics: Plugin captures IDs from other third-party analytics scripts

### Bug Fixes

* Issue 357: Fixes a warning when `window.performance` doesn't exist
* Issue 374: Fixes a warning when the browser doesn't implement `getBattery()` properly
* Issue 376, 377, 378: Fixes warnings when window doesn't exist due to the page unloading
* Issue 378, 380: Fixes warnings when `JSON` doesn't exist

## 1.376.1462309808 (May 3, 2016)

### Bug Fixes

* Issue 366: Fixes a bug where a beacon might not be sent if an IMG is modified several times in a Single Page App nav

## 1.371.1461863625 (April 28, 2016)

### New Features

* Issue 326: Errors plugin: JavaScript Error Reporting
* Issue 338: Support for Boolean Custom Metrics
* Issue 334: International currency formatting support
* Issue 327: Large beacons (for example, those containing ResourceTiming data) are now sent using XHR instead of a FORM POST
* Issue 341: `scr.sxy` parameter added to the beacon (scroll X and Y in pixels at the time of the beacon)

## 1.345.1458593666 (March 21, 2016)

### Bugs Fixes

* Issue 328: Fix race condition causing No Page Groups
* Issue 329: Fix for History plugin when using `auto` in custom SPA frameworks
* Issue 331: Protect against user agents that throw errors on `window.performance` access

## 1.334.1456175784 (February 23, 2016)

### New Features

* XHR instrumentation uses ResourceTiming if available for more accurate performance metrics
* ResourceTiming can be configured to clear ResourceTiming entries after each beacon
* Single Page App navigations now calculate Front-End (`t_page`) and Back-End (`t_resp`) metrics
* Single Page App navigations can be configured tell Boomerang to hold the SPA beacon until the page has completed other non-network activity
* XHR instrumentation can be configured to send XHR beacons for every XHR, instead of combining them during SPA navigations
* Custom Metric JavaScript variables can be configured to only be captured on specific URLs
* XHR instrumentation has a new optional snippet that helps instrument XHR before `boomerang.js` has been loaded
* Single Page App navigations now include NavigationTiming and/or ResourceTiming metrics for hard and soft navigations
* Angular `ui-router` support
* URLs captured via ResourceTiming are now limited to 1,000 characters
* React support
* Other Single Page App support via `window.History` and `onhashchange` monitoring
* ResourceTiming2 encoded, decoded and transfer sizes are collected
* Configurable option to override the name of the `RT` cookie

### Bug Fixes

* Issue 196: Fixes `t_done` merging when two XHRs complete at the same time
* Issue 231: SPA navigations might wait indefinitely for IFRAMEs that were removed from the DOM
* Issue 249: Don't fire a non-SPA beacon when SPA support is enabled
* Issue 250: Wait for page `onload` before firing a SPA Hard Nav
* Issue 260: Revert `form.submit()` behavior back to original style
* Issue 271: Ensure we don't send bad `t_page` values from `responseStart` / `responseEnd` inversions on iOS
* Issue 299: Fixes race condition with manual beacons
* Issue 305: Wrap all sub-frame accesses in `try/catch` to avoid "Permission Denied" errors
* Issue 307: Fixes XHR error codes were not being tracked in some cases
* Issue 313: Fixes conflict with other third-party XHR instrumentation
* Issue 315: SPA navigation beacons being sent when `autorun=false` for prerender

## 1.246.1441122062 (September 1, 2015)

### Bug Fixes

* Issue 174: Allow for quotes in cookies
* Issue 189: Only fire beacons during prerender to visible transition if beyond page load
* Issue 191: Check for Backbone existence on the correct IFRAME

## 1.235.1439916634 (August 18, 2015)

### Bug Fixes

* Bug 95730: Support static function members on JavaScript classes and strings for dimensions, timers and metrics
* Bug 95904: Microsoft Edge browser hang on `form.submit()` on some pages
* Issue 176: Fix for browsers that don't have native support for `Array.filter`
* Issue 181: Fix to stop sending two beacons when SPA is disabled in app configuration but hook code is still on the page
* Issue 179: Enable QuerySelectors for Custom Timers with ResourceTiming

## 0.9.1437148526 (July 17, 2015)

### New Features

* Optional parameter to await completion in bandwidth plugin before sending beacon
* Better support for tag managers and loading after `onload`
* New `dom.script.ext` beacon parameter reports the number of external scripts
* New `dom.img.ext` beacon parameter reports the number of external images
* New `ua.plt` beacon parameter reports the current platform
* New `ua.vnd` beacon parameter reports the current vendor
* QuerySelector support for Custom Metrics, Timers and Dimensions
* AngularJS, Ember.js and Backbone.js support
* Bug 93814: Allow array subscript for variables

### Bug Fixes

* Bug 87109: Sessions were not being reset in some cases, resulting in very long sessions that skew average session duration
* Bug 88717: Auto-XHR: Always use original XHR `.open()` arguments
* Bug 91178: Page Groups using JavaScript variables always need to return the value so we can terminate on match
* Bug 92121: For Cookie Custom Metrics, if the cookie wasn't defined, we were using the current URL as the value
* Bug 92542: Ensure `getEntriesByName()` / `getEntriesByType()` exists in the frame before using
* Bug 92302: Change ResourceTiming optimized trie to avoid strings that trigger a XSS warning from NoScript
* Bug 92560: Auto-XHR: Exclude list not honored in IE
* Bug 92924: Auto-XHR: Not working with IE9
* Bug 94388: Use `rt.start=none` only if we don't have a start time
* Bug 94400: Page Group matching failing on IE (pre-IE11)
* IE Xpath parser: Allow single or double quotes
* RT: `validateLoadTimestamp()`: In an XHR event, trust the end ('now') timestamp
* AutoXHR: Only watch IMGs that have a new `src` attribute or the `src` attribute has changed
