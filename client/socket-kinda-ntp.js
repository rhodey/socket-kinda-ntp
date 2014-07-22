(function(root) {
  
  var kinda_ntp = {};
  var time_sync_interval = 500;
  var time_sync_count = 5;
  var time_sync_array = new Array();
  // note the sync time is stored in corrected server time, not client time.
  var last_sync_time = localStorage.ntpLastSync || 0;
  var time_sync_correction = localStorage.ntpLastOffset || 0;
  var time_sync_round_trip = localStorage.ntpLastRoundTrip || Infinity;

  var iosocket = null;
  var interval_handle = null;

  function new_time_sync() {
    var offset_total = 0;
    var rt_total = 0;

    for(i = 0; i < time_sync_array.length; i++) {
      if(time_sync_array[i]) {
        offset_total += time_sync_array[i].offset;
        rt_total += time_sync_array[i].round_trip_time;
      } else {
        break;
      }
    }
    time_sync_correction = (offset_total / i);
    time_sync_round_trip = (rt_total / i);

    last_sync_time = localStorage.ntpLastSync = kinda_ntp.time();
    localStorage.ntpLastOffset = time_sync_correction;
    localStorage.ntpLastRoundTrip = time_sync_round_trip;
  };
  
  kinda_ntp.resync = function() {
    time_sync_array = [];
    clearInterval(interval_handle);
    interval_handle = setInterval(function() {
      if(time_sync_array.length < time_sync_count)
        iosocket.emit('kinda:get_time', Date.now());
      else
        clearInterval(interval_handle);
    }, time_sync_interval);
  };
  
  kinda_ntp.init = function(socket, interval, count) {
    iosocket = socket;
    time_sync_interval = interval || time_sync_interval;
    time_sync_count = count || time_sync_count;
    
    iosocket.on('kinda:time', function(data) {
      // adding more information to this datapoint
      data.client_receive_time = new Date().getTime();
      data.round_trip_time = data.client_receive_time - data.client_transmit_time;
      data.offset = data.server_transmit_time - (data.client_transmit_time + (data.round_trip_time / 2));

      time_sync_array.push(data);
      if (time_sync_array.length >= time_sync_count) {
        new_time_sync();
      }
    });
    
    kinda_ntp.resync();
  };
  
  kinda_ntp.time = function get_time() {
    return Date.now() + time_sync_correction;
  }

  kinda_ntp.offset = function() {
    return time_sync_correction;
  };

  kinda_ntp.round_trip = function() {
    return time_sync_round_trip;
  };

  if(typeof define === 'function' && define.amd) {
    define('kinda_ntp', [], function() {
      return kinda_ntp;
    });
  }
  else
    root.kinda_ntp = kinda_ntp;

})(window);