/**
 * The bandwidth plugin measures the bandwidth and latency of the user's network
 * connection to your server.
 *
 * Please note that bandwidth detection through JavaScript is not accurate. If
 * the user's network is lossy or is shared with other users, or network traffic
 * is bursty, real bandwidth can vary over time.
 *
 * The measurement Boomerang takes is based over a short period of time, and this may not
 * be representative of the best or worst cases. Boomerang tries to account for that by
 * measuring not just the bandwidth, but also the error value in that measurement.
 *
 * For information on how to include this plugin, see the {@tutorial building} tutorial.
 *
 * ## Setup
 *
 * The bandwidth images are located in the `images/` folder. You need to copy all
 * of these images to a location on your HTTP server.
 *
 * You may put these images on your CDN, but be aware that this could result in
 * increased CDN charges.  You will need to configure your CDN to ignore the
 * query string when caching these images.
 *
 * ## Usage
 *
 * Once Boomerang has been added to your page and {@link BOOMR.init} has been called,
 * the bandwidth test will start once the page loads.
 *
 * See the list of {@link BOOMR.plugins.BW.init BW options} for required {@link BOOMR.init}
 * configuration, e.g. {@link BOOMR.plugins.BW.init BW.base_url}.
 *
 * If you want the page load beacon to include the results of the bandwidth test,
 * setting {@link BOOMR.plugins.BW.init BW.block_beacon} to `true` will force boomerang
 * to wait for the test to complete before sending the beacon.
 *
 * If you do not turn on the {@link BOOMR.plugins.BW.init BW.block_beacon} option,
 * you will only receive bandwidth results if they were cached in a cookie by a
 * previous test run.
 *
 * ## IPv4 optimisations
 *
 * While visitor's IP address information isn't available to JavaScript, if your server
 * can communicate the IP address to JavaScript (e.g. via HTML injection), Boomerang
 * will use it to detect if the visitor has changed networks.  See
 * {@link BOOMR.plugins.BW.init BW.user_ip} for details.
 *
 * If your visitor has an IPv4 address, then Boomerang will also strip out the last
 * part of the IP and use that rather than the entire IP address.  This helps if
 * visitors use DHCP on the same ISP where their IP address changes frequently,
 * but they stay within the same subnet.
 *
 * If the visitor has an IPv6 address, we use the entire address.
 *
 * ## Cookie
 *
 * The bandwidth results are stored within a cookie.  This helps ensure the bandwidth
 * test isn't repeated for the same user repeatedly (slowing down their experience).
 *
 * You can customise the name of the cookie where the bandwidth will be stored via
 * the {@link BOOMR.plugins.BW.init BW.cookie} option.
 *
 * By default this is set to `BA`.
 *
 * This cookie is set to expire in 7 days. You can change its lifetime using
 * the {@link BOOMR.plugins.BW.init BW.cookie_exp} option.
 *
 * During that time, you can also read the value of the cookie on the server
 * side. Its format is as follows:
 *
 * ```
 * BA=ba=nnnnnnn&be=nnn.nn&l=nnnn&le=nn.nn&ip=iiiiii&t=sssssss;
 * ```
 *
 * The parameters are defined as:
 *
 * * `ba` [integer] [bytes/s] The user's bandwidth to your server
 * * `be` [float] [bytes/s] The 95% confidence interval margin of error in measuring the user's bandwidth
 * * `l` [float] [ms] The HTTP latency between the user's computer and your server
 * * `le` [float] [ms] The 95% confidence interval margin of error in measuring the user's latency
 * * `ip` [ip address] The user's IPv4 or IPv6 address that was passed as the user_ip parameter to the init() method
 * * `t` [timestamp] The browser time (in seconds since the epoch) when the cookie was set
 *
 * ## Disabling the bandwidth check
 *
 * Finally, there may be cases when you want to completely disable the bandwidth test --
 * perhaps you know that your user is on a slow network, or pays by the byte (the
 * andwidth test uses a lot of bandwidth), or is on a mobile device that cannot
 * handle the load.
 *
 * In such cases you have two options:
 *
 * * Delete the bandwdith plugin (`delete BOOMR.plugins.BW`)
 * * Set the {@link BOOMR.plugins.BW.init BW.enabled} parameter to `false`
 *
 * ## Methodology
 * Bandwidth and latency are measured by downloading fixed-size images from a server
 * and measuring the time it took to download them.  We run it in the following order:
 *
 * * First, download a 32 byte gif 10 times serially.  This is used to measure latency.
 *   * We discard the first measurement because that pays the price for the TCP
 *     handshake (3 packets) and TCP slow-start (4 more packets).  All other
 *     image requests take two TCP packets (one for the request and one for the
 *     response).  This gives us a good idea of how much time it takes to
 *     make a HTTP request from the browser to our server.
 *   * Once done, we calculate the arithmetic mean, standard deviation and standard
 *     error at 95% confidence for the 9 download times that we have.  This is
 *     the latency number (`lat`) and confidence intervl (`lat_err`) that we
 *     beacon back to our server.
 * * Next, download images of increasing size until one of the times out
 *   * We choose image sizes so that we can narrow down on a bandwidth range as
 *     soon as possible.
 *   * Image timeouts are set at between 1.2 and 1.5 seconds.  If an image times
 *     out, we stop downloading larger images, and retry the largest image 4
 *     more times.  We then calculate the bandwidth for the largest 3 images
 *     that we downloaded.  This should result in 7 readings unless the test
 *     timed out before that. We calculate the median, standard deviation and
 *     standard error from these values and this is the bandwidth (`bw`) and
 *     confidence interval (`bw_err`) that we beacon back to our server.
 *
 * ## Beacon Parameters
 *
 * This plugin adds the following parameters to the beacon:
 *
 * * `bw`: User's measured bandwidth in bytes per second
 * * `bw_err`: 95% confidence interval margin of error in measuring user's bandwidth
 * * `lat`: User's measured HTTP latency in milliseconds
 * * `lat_err`: 95% confidence interval margin of error in measuring user's latency
 * * `bw_time` Timestamp (seconds since the epoch) on the user's browser when
 *   the bandwidth and latency was measured
 * * `bw_debug` Debug information
 *
 * @class BOOMR.plugins.BW
 */
(function() {
  var impl, images;

  BOOMR = window.BOOMR || {};
  BOOMR.plugins = BOOMR.plugins || {};

  if (BOOMR.plugins.BW) {
    return;
  }

  // We choose image sizes so that we can narrow down on a bandwidth range as
  // soon as possible the sizes chosen correspond to bandwidth values of
  // 14-64kbps, 64-256kbps, 256-1024kbps, 1-2Mbps, 2-8Mbps, 8-30Mbps & 30Mbps+
  // Anything below 14kbps will probably timeout before the test completes
  // Anything over 60Mbps will probably be unreliable since latency will make up
  // the largest part of download time. If you want to extend this further to
  // cover 100Mbps & 1Gbps networks, use image sizes of 19,200,000 & 153,600,000
  // bytes respectively
  // See https://spreadsheets.google.com/ccc?key=0AplxPyCzmQi6dDRBN2JEd190N1hhV1N5cHQtUVdBMUE&hl=en_GB
  // for a spreadsheet with the details
  //
  // The images were generated with ImageMagic, using random uncompressed data.
  // As input data (image-3.bin) I used the original images that were encrypted using AES256.
  // The IM command used was : convert -size 618x618 -depth 8 gray:image-3.bin image-3.png
  // Vary the image dimensions to change the filesize. The image dimensions are more or less
  // the square of the desired filesize.
  images = [
    { name: "image-0.png", size: 11773, timeout: 1400 },
    { name: "image-1.png", size: 40836, timeout: 1200 },
    { name: "image-2.png", size: 165544, timeout: 1300 },
    { name: "image-3.png", size: 382946, timeout: 1500 },
    { name: "image-4.png", size: 1236278, timeout: 1200 },
    { name: "image-5.png", size: 4511798, timeout: 1200 },
    { name: "image-6.png", size: 9092136, timeout: 1200 }
  ];

  images.end = images.length;
  images.start = 0;

  // abuse arrays to do the latency test simply because it avoids a bunch of
  // branches in the rest of the code.
  // I'm sorry Douglas
  images.l = { name: "image-l.gif", size: 35, timeout: 1000 };

  // private object
  impl = {
    // properties
    base_url: "",
    timeout: 15000,
    nruns: 5,
    latency_runs: 10,
    user_ip: "",
    block_beacon: false,
    test_https: true,
    cookie_exp: 7 * 86400,
    cookie: "BA",

    // state
    results: [],
    latencies: [],
    latency: null,
    runs_left: 0,
    aborted: false,

    // defaults to true so we don't block other plugins if this cannot start.
    complete: true,

    // init sets it to false
    running: false,

    initialized: false,

    // methods

    // numeric comparator.  Returns negative number if a < b, positive if a > b and 0 if they're equal
    // used to sort an array numerically
    ncmp: function(a, b) {
      return (a - b);
    },

    // Calculate the interquartile range of an array of data points
    iqr: function(a) {
      var l = a.length - 1,
          q1, q3, fw,
          b = [],
          i;

      q1 = (a[Math.floor(l * 0.25)] + a[Math.ceil(l * 0.25)]) / 2;
      q3 = (a[Math.floor(l * 0.75)] + a[Math.ceil(l * 0.75)]) / 2;

      fw = (q3 - q1) * 1.5;

      // fw === 0 => all items are identical, so no need to filter
      if (fw === 0) {
        return a;
      }

      l++;

      for (i = 0; i < l && a[i] < q3 + fw; i++) {
        if (a[i] > q1 - fw) {
          b.push(a[i]);
        }
      }

      return b;
    },

    calc_latency: function() {
      var i, n,
          sum = 0,
          sumsq = 0,
          amean, median,
          std_dev, std_err,
          lat_filtered;

      // We ignore the first since it paid the price of DNS lookup, TCP connect
      // and slow start
      this.latencies.shift();

      // We first do IQR filtering and use the resulting data set
      // for all calculations
      lat_filtered = this.iqr(this.latencies.sort(this.ncmp));
      n = lat_filtered.length;

      BOOMR.debug("latencies: " + this.latencies, "bw");
      BOOMR.debug("lat_filtered: " + lat_filtered, "bw");

      // First we get the arithmetic mean, standard deviation and standard error
      for (i = 0; i < n; i++) {
        sum += lat_filtered[i];
        sumsq += lat_filtered[i] * lat_filtered[i];
      }

      amean = Math.round(sum / n);

      std_dev = Math.sqrt(sumsq / n - sum * sum / (n * n));

      // See http://en.wikipedia.org/wiki/1.96 and http://en.wikipedia.org/wiki/Standard_error_%28statistics%29
      std_err = (1.96 * std_dev / Math.sqrt(n)).toFixed(2);

      std_dev = std_dev.toFixed(2);

      median = Math.round(
        (lat_filtered[Math.floor(n / 2)] + lat_filtered[Math.ceil(n / 2)]) / 2
      );

      return { mean: amean, median: median, stddev: std_dev, stderr: std_err };
    },

    calc_bw: function() {
      var i, j,
          n = 0,
          r,
          bandwidths = [],
          bandwidths_corrected = [],
          sum = 0,
          sumsq = 0,
          sum_corrected = 0,
          sumsq_corrected = 0,
          amean, std_dev, std_err, median,
          amean_corrected, std_dev_corrected, std_err_corrected, median_corrected,
          nimgs, bw, bw_c,
          debug_info = [];

      for (i = 0; i < this.nruns; i++) {
        if (!this.results[i] || !this.results[i].r) {
          continue;
        }

        r = this.results[i].r;

        // the next loop we iterate through backwards and only consider the largest
        // 3 images that succeeded that way we don't consider small images that
        // downloaded fast without really saturating the network
        nimgs = 0;
        for (j = r.length - 1; j >= 0 && nimgs < 3; j--) {
          // if we hit an undefined image time, we skipped everything before this
          if (!r[j]) {
            break;
          }

          if (r[j].t === null) {
            continue;
          }

          n++;
          nimgs++;

          // multiply by 1000 since t is in milliseconds and not seconds
          bw = images[j].size * 1000 / r[j].t;
          bandwidths.push(bw);

          if (r[j].t > this.latency.mean) {
            bw_c = images[j].size * 1000 / (r[j].t - this.latency.mean);
            bandwidths_corrected.push(bw_c);
          }
          else {
            debug_info.push(j + "_" + r[j].t);
          }
        }
      }

      BOOMR.debug("got " + n + " readings", "bw");

      BOOMR.debug("bandwidths: " + bandwidths, "bw");
      BOOMR.debug("corrected: " + bandwidths_corrected, "bw");

      // First do IQR filtering since we use the median here
      // and should use the stddev after filtering.
      if (bandwidths.length > 3) {
        bandwidths = this.iqr(bandwidths.sort(this.ncmp));
        bandwidths_corrected = this.iqr(bandwidths_corrected.sort(this.ncmp));
      }
      else {
        bandwidths = bandwidths.sort(this.ncmp);
        bandwidths_corrected = bandwidths_corrected.sort(this.ncmp);
      }

      BOOMR.debug("after iqr: " + bandwidths, "bw");
      BOOMR.debug("corrected: " + bandwidths_corrected, "bw");

      // Now get the mean & median.
      // Also get corrected values that eliminate latency
      n = Math.max(bandwidths.length, bandwidths_corrected.length);
      for (i = 0; i < n; i++) {
        if (i < bandwidths.length) {
          sum += bandwidths[i];
          sumsq += Math.pow(bandwidths[i], 2);
        }

        if (i < bandwidths_corrected.length) {
          sum_corrected += bandwidths_corrected[i];
          sumsq_corrected += Math.pow(bandwidths_corrected[i], 2);
        }
      }

      n = bandwidths.length;
      amean = Math.round(sum / n);
      std_dev = Math.sqrt(sumsq / n - Math.pow(sum / n, 2));
      std_err = Math.round(1.96 * std_dev / Math.sqrt(n));
      std_dev = Math.round(std_dev);

      n = bandwidths.length - 1;
      median = Math.round(
        (bandwidths[Math.floor(n / 2)] + bandwidths[Math.ceil(n / 2)]) / 2
      );

      if (bandwidths_corrected.length < 1) {
        BOOMR.debug("not enough valid corrected datapoints, falling back to uncorrected", "bw");
        debug_info.push("l==" + bandwidths_corrected.length);

        amean_corrected = amean;
        std_dev_corrected = std_dev;
        std_err_corrected = std_err;
        median_corrected = median;
      }
      else {
        n = bandwidths_corrected.length;
        amean_corrected = Math.round(sum_corrected / n);
        std_dev_corrected = Math.sqrt(sumsq_corrected / n - Math.pow(sum_corrected / n, 2));
        std_err_corrected = (1.96 * std_dev_corrected / Math.sqrt(n)).toFixed(2);
        std_dev_corrected = std_dev_corrected.toFixed(2);

        n = bandwidths_corrected.length - 1;
        median_corrected = Math.round(
          (
            bandwidths_corrected[Math.floor(n / 2)] +
            bandwidths_corrected[Math.ceil(n / 2)]
          ) / 2
        );
      }

      BOOMR.debug("amean: " + amean + ", median: " + median, "bw");
      BOOMR.debug("corrected amean: " + amean_corrected + ", " + "median: " + median_corrected, "bw");

      return {
        mean: amean,
        stddev: std_dev,
        stderr: std_err,
        median: median,
        mean_corrected: amean_corrected,
        stddev_corrected: std_dev_corrected,
        stderr_corrected: std_err_corrected,
        median_corrected: median_corrected,
        debug_info: debug_info
      };
    },

    load_img: function(i, run, callback) {
      var url = this.base_url + images[i].name +
          "?t=" + BOOMR.utils.generateId(10),
          timer = 0,
          tstart = 0,
          img = new Image(),
          that = this;

      function handler(value) {
        return function() {
          if (callback) {
            callback.call(that, i, tstart, run, value);
          }

          if (value !== null) {
            img.onload = img.onerror = null;
            img = null;
            clearTimeout(timer);
            that = callback = null;
          }
        };
      }

      img.onload = handler(true);
      img.onerror = handler(false);

      // the timeout does not abort download of the current image, it just sets an
      // end of loop flag so we don't attempt download of the next image we still
      // need to wait until onload or onerror fire to be sure that the image
      // download isn't using up bandwidth.  This also saves us if the timeout
      // happens on the first image.  If it didn't, we'd have nothing to measure.
      timer = setTimeout(handler(null), images[i].timeout + Math.min(400, this.latency ? this.latency.mean : 400));

      tstart = BOOMR.now();
      img.src = url;
    },

    lat_loaded: function(i, tstart, run, success) {
      if (run !== this.latency_runs + 1) {
        return;
      }

      if (success !== null) {
        var lat = BOOMR.now() - tstart;

        this.latencies.push(lat);
      }

      // we've got all the latency images at this point,
      // so we can calculate latency
      if (this.latency_runs === 0) {
        this.latency = this.calc_latency();
      }

      BOOMR.setImmediate(this.iterate, null, null, this);
    },

    img_loaded: function(i, tstart, run, success) {
      if (run !== this.runs_left + 1) {
        return;
      }

      if (this.results[this.nruns - run].r[i])  {
        // already called on this image
        return;
      }

      // if timeout, then we set the next image to the end of loop marker
      if (success === null) {
        this.results[this.nruns - run].r[i + 1] = {t: null, state: null, run: run};

        return;
      }

      var result = {
        start: tstart,
        end: BOOMR.now(),
        t: null,
        state: success,
        run: run
      };

      if (success) {
        result.t = result.end - result.start;
      }

      this.results[this.nruns - run].r[i] = result;

      // we terminate if an image timed out because that means the connection is
      // too slow to go to the next image
      if (i >= images.end - 1 || this.results[this.nruns - run].r[i + 1] !== undefined) {
        BOOMR.debug(BOOMR.utils.objectToString(this.results[this.nruns - run], undefined, 2), "bw");

        // First run is a pilot test to decide what the largest image
        // that we can download is. All following runs only try to
        // download this image
        if (run === this.nruns) {
          images.start = i;
        }

        BOOMR.setImmediate(this.iterate, null, null, this);
      }
      else {
        this.load_img(i + 1, run, this.img_loaded);
      }
    },

    finish: function() {
      if (!this.latency) {
        this.latency = this.calc_latency();
      }

      var bw = this.calc_bw(),
          o = {
            bw:         bw.median_corrected,
            bw_err:     parseFloat(bw.stderr_corrected, 10),
            lat:        this.latency.mean,
            lat_err:    parseFloat(this.latency.stderr, 10),
            bw_time:    Math.round(BOOMR.now() / 1000)
          };

      BOOMR.addVar(o);

      if (bw.debug_info.length > 0) {
        BOOMR.addVar("bw_debug", bw.debug_info.join(","));
      }

      // If we have an IP address we can make the BA cookie persistent for a while
      // because we'll recalculate it if necessary (when the user's IP changes).
      if (!isNaN(o.bw) && o.bw > 0) {
        BOOMR.utils.setCookie(this.cookie,
          {
            ba: Math.round(o.bw),
            be: o.bw_err,
            l:  o.lat,
            le: o.lat_err,
            ip: this.user_ip,
            t:  o.bw_time
          },
          (this.user_ip ? this.cookie_exp : 0)
        );
      }

      this.complete = true;

      if (this.block_beacon === true) {
        BOOMR.sendBeacon();
      }

      this.running = false;
    },

    iterate: function() {
      if (!this.aborted) {
        if (!this.runs_left) {
          this.finish();
        }
        else if (this.latency_runs) {
          this.load_img("l", this.latency_runs--, this.lat_loaded);
        }
        else {
          this.results.push({r: []});
          this.load_img(images.start, this.runs_left--, this.img_loaded);
        }
      }
    },

    setVarsFromCookie: function() {
      var cookies, ba, bw_e, lat, lat_e, c_sn, t, p_sn, t_now;

      cookies = BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(impl.cookie));

      if (cookies && cookies.ba) {
        ba = parseInt(cookies.ba, 10);
        bw_e = parseFloat(cookies.be, 10);
        lat = parseInt(cookies.l, 10) || 0;
        lat_e = parseFloat(cookies.le, 10) || 0;
        // Note this is IPv4 only
        c_sn = cookies.ip.replace(/\.\d+$/, "0");
        t = parseInt(cookies.t, 10);
        p_sn = this.user_ip.replace(/\.\d+$/, "0");

        // We use the subnet instead of the IP address because some people
        // on DHCP with the same ISP may get different IPs on the same subnet
        // every time they log in

        // (in seconds)
        t_now = Math.round(BOOMR.now() / 1000);

        // If the subnet changes or the cookie is more than 7 days old,
        // then we recheck the bandwidth, else we just use what's in the cookie
        if (c_sn === p_sn && t >= t_now - this.cookie_exp && ba > 0) {
          this.complete = true;
          BOOMR.addVar({
            bw:      ba,
            lat:     lat,
            bw_err:  bw_e,
            lat_err: lat_e,
            bw_time: t
          });

          return true;
        }
      }

      return false;
    }

  };

  BOOMR.plugins.BW = {
    /**
     * Initializes the plugin.
     *
     * @param {object} config Configuration
     * @param {string} [config.BW.base_url] By default, this is set to the empty string,
     * which has the effect of disabling the bandwidth plugin. Set the
     * `base_url` parameter to the HTTP path of the directory that contains
     * the bandwidth images to enable this test.
     *
     * This can be an absolute or a relative URL.
     *
     * If it's relative, remember that it's relative to the page that boomerang is included
     * in and not to the javascript file.
     *
     * The trailing / is required.
     * @param {boolean} [config.BW.cookie] The name of the cookie in which to store
     * the measured bandwidth and latency of the user's network connection.
     *
     * The default name is `BA`.
     * @param {boolean} [config.BW.cookie_exp] The lifetime in seconds of the bandwidth cookie.
     *
     * The default is set to 7 days. This specifies how long it will be before
     * we run the bandwidth test again for a user, assuming their IP address
     * doesn't change within this time.
     *
     * You probably do not need to change this setting at all since the bandwidth
     * of a given network connection typically does not change by an order
     * of magnitude on a regular basis.
     *
     * Note that if you're doing some kind of real-time streaming, then
     * chances are that this bandwidth test isn't right for you, so
     * setting this cookie to a shorter value isn't the right solution.
     * @param {number} [config.BW.timeout] The timeout in seconds for the entire bandwidth test.
     *
     * The default is set to 15 seconds.
     *
     * The bandwidth test can run for a long time, and sometimes, due to
     * network errors, it might never complete. The timeout forces the test
     * to complete at that time. This is a hard limit.
     *
     * If the timeout fires, we stop further iterations of the test and
     * attempt to calculate bandwidth with the data that we've collected at that point.
     *
     * Increasing the timeout can get you more data and increase the accuracy
     * of the test, but at the same time increases the risk of the test not
     * completing before the user leaves the page.
     * @param {number} [config.BW.nruns] The number of times the bandwidth test should run.
     *
     * The default is set to 5.
     *
     * The first test is always a pilot to figure out the best way to proceed
     * with the remaining tests. Increasing this number will increase the
     * tests accuracy, but at the same time increases the risk that the test will timeout.
     *
     * It should take about 2-4 seconds per run, so consider this value along with the timeout value above.
     * @param {boolean} [config.BW.test_https] By default, boomerang will skip the bandwidth
     * test over an HTTPS connection.
     *
     * Establishing an SSL connection takes time, which could skew the
     * bandwidth results. If all your traffic is sent over SSL, then running
     * the test over SSL probably gets you what you want.
     *
     * If you set `test_https` to `true`, boomerang will run the test instead of skipping.
     * @param {boolean} [config.BW.block_beacon] By default, the bandwidth plugin
     * will not block boomerang from sending a beacon, so the results will
     * not be included in the broadcast with default settings.
     *
     * If you set `block_beacon` to true, boomerang will wait for the
     * results of the test before sending the beacon.
     * @param {string} [config.BW.user_ip] The user's IP address, for detecting
     * if networks change.
     *
     * @returns {@link BOOMR.plugins.BW} The BW plugin for chaining
     * @memberof BOOMR.plugins.BW
     */
    init: function(config) {
      if (impl.initialized) {
        return this;
      }

      BOOMR.utils.pluginConfig(impl, config, "BW",
        ["base_url", "timeout", "nruns", "cookie", "cookie_exp", "test_https", "block_beacon"]);

      if (config && config.user_ip) {
        impl.user_ip = config.user_ip;
      }

      if (!impl.base_url) {
        return this;
      }

      images.start = 0;
      impl.runs_left = impl.nruns;
      impl.latency_runs = 10;
      impl.results = [];
      impl.latencies = [];
      impl.latency = null;
      impl.complete = impl.aborted = false;

      BOOMR.removeVar("ba", "ba_err", "lat", "lat_err");

      if (!impl.setVarsFromCookie()) {
        BOOMR.subscribe("page_ready", this.run, null, this);
        BOOMR.subscribe("xhr_load", this.run, null, this);
      }

      impl.initialized = true;

      return this;
    },

    /**
     * Starts the bandwidth test. This method is called automatically when
     * boomerang's {@link BOOMR#event:page_ready} event fires, so you won't need
     * to call it yourself.
     *
     * @returns {@link BOOMR.plugins.BW} The BW plugin for chaining
     * @memberof BOOMR.plugins.BW
     */
    run: function() {
      var a;

      if (impl.running || impl.complete) {
        return this;
      }

      // Turn image url into an absolute url if it isn't already
      a = BOOMR.window.document.createElement("a");
      a.href = impl.base_url;

      if (!impl.test_https && a.protocol === "https:") {
        // we don't run the test for https because SSL stuff will mess up b/w
        // calculations we could run the test itself over HTTP, but then IE
        // will complain about insecure resources, so the best is to just bail
        // and hope that the user gets the cookie from some other page
        BOOMR.info("HTTPS detected, skipping bandwidth test", "bw");
        impl.complete = true;

        if (impl.block_beacon === true) {
          BOOMR.sendBeacon();
        }

        return this;
      }

      impl.base_url = a.href;
      impl.running = true;

      setTimeout(this.abort, impl.timeout);

      impl.iterate();

      return this;
    },

    /**
     * Stops the bandwidth test immediately and attempts to calculate bandwidth
     * and latency from values that it has already gathered.
     *
     * This method is called automatically if the bandwidth test times out.
     *
     * It is better to set the timeout value appropriately when calling the
     * {@link BOOMR.init} method.
     * @memberof BOOMR.plugins.BW
     */
    abort: function() {
      impl.aborted = true;

      if (impl.running) {
        // we don't defer this call because it might be called from
        // onunload and we want the entire chain to complete
        // before we return
        impl.finish();
      }
    },

    /**
     * Whether or not this plugin is complete
     *
     * @returns {boolean} `true` if the plugin is complete
     * @memberof BOOMR.plugins.BW
     */
    is_complete: function() {
      if (impl.block_beacon === true) {
        return impl.complete;
      }
      else {
        return true;
      }
    }
  };
}());
// End of BW plugin
