(function () {
  if (!window.DevUtil) {
    window.DevUtil = {};
  };
  window.DevUtil.Profiler = (function () {
    var that = [],
        profiles = {};
    that.start = function (lbl) {
      if (!!profiles[lbl]) {
        central1.Log.warning("Profiler for label '" + lbl + "' restarted")
      };
      profiles[lbl] = new Date();
      central1.Log.debug("Profiler for label '" + lbl + "' started")
    };
    that.stop = function (lbl) {
      if (!!profiles[lbl]) {
        var endTime = new Date(),
            elapsedTime = (endTime-profiles[lbl])/1000,
            res = lbl.toString() + "| Elapsed Time:" + elapsedTime.toString() + "sec.";
        res.label = lbl;
        res.startTime =  profiles[lbl];
        res.endTime =  endTime;
        res.elapsedTime =  elapsedTime;
        that.push(res);      
      } else{
        central1.Log.warning("No profiler of label '"+lbl+"' was found")
      };
    }
    return that;
  })();  
  window.DevUtil.Log = (function(){
    var that = [], 
        levels = ["debug", "info", "warning", "error"], lvl;
    function logLevel(lvl){
      return function (msg){
        var now = new Date(),
            res = new String(lvl.toString() + "|" + now.toString() + "|" + msg.toString());
        res.level = lvl;
        res.message = msg;
        res.time = now;
        that.push( res );
      };
    }
    for (var i = levels.length - 1; i >= 0; i--){
      lvl = levels[i];
      that[lvl] = logLevel(lvl);
    };
    return that;
  })();
})();