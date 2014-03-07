

// Chat view controller
function ChatView(app, element){
    this.app = app;
    this.element = element;
	this.toolbar = $(element).next();
	// Templates
	this.msg_template = Handlebars.compile($('#my-message-template').html());
	this.others_template = Handlebars.compile($('#others-message-template').html());
	// Bind events
	$(this.toolbar).find('.messageSendButton').on( "click", $.proxy( this.sendMessage, this));
}
ChatView.prototype.sendMessage = function(){
    //get current time with am or pm
	var date = new Date();
	var hour = date.getHours();
	hour = (hour + 24) % 24;
	var mid = 'AM';
	if (hour == 0) 
		hour = 12;
	else if (hour > 12) {
		hour = hour % 12;
		mid = 'PM';
	}
	var min = date.getMinutes();
	if (min < 10) {
		min = '0' + min;
	}
	
	// Get data from form
    var txt = $(this.toolbar).find('.form textarea').val();
	
    // HTML add markup
	var chatroom = $(this.element).find('.chatroom');
	// check whether txt is empty
	if (txt.length > 0) {
		chatroom.append(this.msg_template({
			time: hour + ":" + min + " " + mid,
			text: txt
		}));
	}
	
    // Send message to the server
    this.app.sendMessage(txt, function(){
        // Success
		// chatroom.append('.... ok');
    }, function(){
        // Fail
    });
}
ChatView.prototype.receiveMessage = function() {
	// Get others' text from server
	
	
	// HTML add markup
	var chatroom = $(this.element).find('.chatroom');
}


// Main application
var app = {
    sendMessage: function(txt, success, fail){
        // this.location_id
        // this.my_profile_id
        // txt
        // AJAX
		success();
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
        
        this.initializeViews();
        // Show view depending on status
        
        // Tests
        //this.chat_view.sendMessage('aaaa');
    },
    
    initializeViews: function(){
        this.chat_view = new ChatView(this, document.getElementById('chat_view'));
    }
};
