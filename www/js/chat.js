

// Chat view controller
function ChatView(app, element){
    this.app = app;
    this.element = element;
	this.toolbar = $(element).find('.chatbar');
	// Templates
	this.msg_template = Handlebars.compile($('#message-template').html());
	// Bind events
	$(this.toolbar).find('.messageSendButton').on( "click", $.proxy( this.sendMessage, this));
}
ChatView.prototype.sendMessage = function(){
    //get current time with am or pm
	var date = new Date();
	
	// Get data from form
	var textarea = $(this.toolbar).find('.form>textarea');
    var txt = textarea.val();
    textarea.val(''); // Reset field
	
    // HTML add markup
	var chatroom = $(
	this.element).find('.chatroom');
	// check whether txt is empty
	if (txt.length > 0) {
		chatroom.append(this.msg_template({
			time: date,
			text: txt,
			author: 'me',
			mine: true
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