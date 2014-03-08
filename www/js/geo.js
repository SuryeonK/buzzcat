
var geo = (function(){
    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }
    
    function distance(lat1, lon1, lat2, lon2) {
      var R = 6378135; // Earth Radius, spherical model
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      return R * c;
    }
    return {
        deg2rad: deg2rad,
        distance: distance
    }
})();