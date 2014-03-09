
function MapView(app, element){
    this.app = app;
    this.element = element;
	
	// create a map in the "map" div, set the view to a given place and zoom
	var map = L.map('map').setView([this.app.my_position.lat, this.app.my_position.lon], 13);
	var self = this;
	
	this.app.GET("/chats/" + this.app.location_id + "/users", function(data){
        self.users = data.length;
		self.marker.bindPopup("You are in " + self.app.location_name + " with " + self.users + " more people").openPopup();
    });
	
	// add an OpenStreetMap tile layer
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	// add a marker in the given location, attach some popup content to it and open the popup
	var marker = L.marker([this.app.my_position.lat, this.app.my_position.lon]).addTo(map);	
		
	L.circle([this.app.my_position.lat, this.app.my_position.lon], 20, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(map);
}