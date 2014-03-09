
// Main application
var app = {
    baseURL: 'http://buzzcat-basaundi.rhcloud.com/api',
    REQUEST: function(type, url, data, success, fail){
        var ops = {
            type: type,
            contentType: 'application/json',
            dataType: 'json',
            url: this.baseURL + url,
        };
        if(data) ops.data = JSON.stringify(data);
        $.ajax(ops).done(success).fail(fail);
    },
    GET: function(url, success, fail){
        this.REQUEST('GET', url, null, success, fail);
    },
    POST: function(url, data, success, fail){
        this.REQUEST('POST', url, data, success, fail);
    },
    PUT: function(url, data, success, fail){
        this.REQUEST('PUT', url, data, success, fail);
    },
    DELETE: function(url, success, fail){
        this.REQUEST('DELETE', url, data, success, fail);
    },
    
    sendMessage: function(txt, success, fail){
        var msg = {
            type: 'text',
            content: txt,
            author: this.my_profile._id,
            time: new Date()
        };
        // this.location_id
        this.POST('/chats/'+this.location_id+'/messages', msg, success, fail);
    },
    
    // Create a profile given the data
    createProfile: function(profile){
        // Prevent the user from creating a new profile if he already has one
        if(this.my_profile || localStorage.my_profile_id){
            throw 'Profile already exists';
        }
        var col = this.db.col('profiles');
        // Generate some internal password for the user
        profile.key = '';
        for(var i=0; i<4; i++) profile.key += (Math.random()+1).toString(36).substring(2);
        
        // Save
        localStorage.my_profile_id = col.insert(profile);
        this.my_profile = profile;
        this.POST('/profiles', profile, function(){}, function(){});
    },
    loadProfile: function(){
        this.my_profile = this.db.col('profiles').findOne({_id: localStorage.my_profile_id}) || {};
	},
	saveProfile: function(){
	    this.db.col('profiles').update({_id: this.my_profile._id}, this.my_profile);
	},
    
    // Application Constructor
    initialize: function() {
        // Initialize DB
        var con = new Chongo.Connection(localStorage);
        this.db = con.db('buzzCat');
        
        this.my_position = {lat: 999, lon: 999};
        
        // Run this application in the background also after exiting
        //window.plugin.backgroundMode.enable();
        
        // Show view depending on status
		this.loadProfile();
        this.initializeViews();
		
		// Watch position
        navigator.geolocation.watchPosition(
            $.proxy( this.newPosition, this),
            $.proxy( this.noPosition, this),
            {frequency: 5000, maximumAge: 60000, timeout: 1000}
        );
        // Watch messages
        setTimeout($.proxy(this.pollMessages, this), 0);
        $(document).on('LOCATION_READY', $.proxy(this.joinChannel, this));
    },
    
    joinChannel: function(){
        this.POST('/chats/'+this.location_id+'/users',
                    {profile_id: this.my_profile_id},
                    function(){}, function(){});
    },
    
    pollMessages: function(){
        var self = this;
        this.GET('/chats/' + this.location_id + '/messages', function(data){
            for (var i=0; i < data.length; ++i){
                $(document).trigger('NEW_MESSAGE', data[i]);
            }
            setTimeout($.proxy(self.pollMessages, self), 1000);
        }, function(){
            setTimeout($.proxy(self.pollMessages, self), 5000);
        });
    },
    
    initializeViews: function(){
        this.chat_view = new ChatView(this, document.getElementById('chat_view'));
        this.settings_view = new SettingsView(this, document.getElementById('settings_view'));
        this.notifications_view = new NotificationsView(this, document.getElementById('notifications_view'));
        this.profile_view = new ProfileView(this, document.getElementById('profile_view'));
        this.map_view = new MapView(this, document.getElementById('map_view'));
    },
    
    noPosition: function(error){
        console.error('ERROR(' + error.code + '): ' + error.message);
    },
    
    newPosition: function(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        if(geo.distance(lat, lon, this.my_position.lat, this.my_position.lon) > 5){ // Moved more than 5 meters
            this.my_position = {lat: lat, lon: lon};
            var self = this;
            
            $.get('http://open.mapquestapi.com/nominatim/v1/reverse.php?format=json&lat='+lat+'&lon='+lon, function(data){
                self.location_id = data.place_id;
                self.location_name = data.display_name.split(',')[0];
                $(document).trigger('LOCATION_READY');
            });
        }
    }
};
