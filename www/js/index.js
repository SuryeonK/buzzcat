

// Chat view controller
function ChatView(app, element){
    this.app = app;
    this.element = element;
}
ChatView.prototype.sendMessage = function(){
    // Get data from form
    
    // HTML add markup
    
    // Send message to the server
    this.app.sendMessage(txt, function(){
        // Success
    }, function(){
        // Fail
    });
}

// Main application
var app = {
    sendMessage: function(txt, success, fail){
        // this.location_id
        // this.my_profile_id
        // txt
        // AJAX
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
        // TODO: Send AJAX
    },
    
    // Application Constructor
    initialize: function() {
        // Initialize DB
        var con = new Chongo.Connection(localStorage);
        this.db = con.db('buzzCat');
        
        // Run this application in the background also after exiting
        //window.plugin.backgroundMode.enable();
                navigator.geolocation.getCurrentPosition(
            function(position){
                console.log( position.coords.latitude + ','+position.coords.longitude);
            },
            function(error){ console.log('awaa'); },{frequency:5000,maximumAge: 0, timeout: 100, enableHighAccuracy:true}); 

        $('<p>yaaaaa <br /></p>').insertAfter('h2');
        
        this.initializeViews();
        // Show view depending on status
        
        // Tests
        //this.chatView.sendMessage('aaaa');
    },
    
    initializeViews: function(){
        this.chatView = ChatView(this, document.getElementById('chat_view'));
    }
};
