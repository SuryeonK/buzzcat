
function MapView(app, element){
    this.app = app;
    this.element = element;
	
	// create a map in the "map" div, set the view to a given place and zoom
	var map = L.map('map').setView([46, -116], 13);
	this.map = map;
	
	// add a marker in the given location, attach some popup content to it and open the popup
	var marker = L.marker([0, 0]).addTo(map);
		
	this.marker = marker;
	
	this.circle = L.circle([0, 0], 10, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(map);
	
	// add an OpenStreetMap tile layer
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
	
	var self = this;
	$(document).bind('LOCATION_READY', function(){
		var pos = new L.LatLng(self.app.my_position.lat, self.app.my_position.lon);
		self.map.setView(pos, 17);
		self.app.GET("/chats/" + self.app.location_id + "/users", function(data){
			self.users = data.length;
			console.log("You are in " + self.app.location_name + " with " + self.users + " more people");
			self.marker.setLatLng(pos).bindPopup("You are in " + self.app.location_name + " with " + self.users + " more people").openPopup();
			self.circle.setLatLng(pos);
		});		
	});
}