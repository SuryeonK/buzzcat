// Emoticons

function Emoticons() {
	// Content for Popovers:
	var popoverContent = '<ul class="list"><li><h3><image src="./img/emoticons/icon_smile.png"></image></h3></li><li><h3><image src="./img/emoticons/icon_sad.png"></image></h3></li></ul>';
	 
	// Callback for Popovers:
	var fillPopover = function(popover) {
	  // Populate Popover with content:
	  $('.show-popover').append(popoverContent);
	  popoverEventHandler();
	};

	var popoverEventHandler = function() {
	  // Attach event to catch user interaction.
	  // Use singletap to allow user to scroll content.
	  $('.show-popover').on('singletap', function(e) {
		var results;
		if (this.id === 'showPopover') {
		  results = '#fruitsChoice';
		}
		
		
		
		var listItem;
		if (e.target.nodeName === 'LI') {
		  $(results).html(e.target.textContent.trim());
		} else {
		  listItem = $(e.target).closest('li')[0];
		  $(results).html(listItem.textContent.trim());
		}
		$.UIPopoverClose();
	  });
	};

	// Initialize Popover:
	$('#showPopover').UIPopover({
	  id: 'showPopover', 
	  title: "Emoticons", 
	  callback: fillPopover
	});
}

// Replace image into characters
function ReplaceEmoticons(element) {
	// get id of the image

	// compare the id with characters and replace it

	
}

// Chat view controller
function ChatView(app, element){
    this.app = app;
    this.element = element;
	this.toolbar = $(element).next().get(0);
	// Templates
	this.msg_template = Handlebars.compile($('#message-template').html());
	// Bind events
	$(this.toolbar).find('textarea').on('keyup', function(){
	    this.style.height = "";
	    this.style.height = Math.min(this.scrollHeight, 150) + "px";
	});
	$(this.toolbar).find('.messageSendButton').on( "click", $.proxy( this.sendMessage, this));
}
ChatView.prototype.sendMessage = function(){
    //get current time with am or pm
	var date = new Date();
	
	// Get data from form
	var textarea = $(this.toolbar).find('.form>textarea');
    var txt = textarea.val();
    textarea.val(''); // Reset field
    textarea.get(0).style.height = '';
	
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
		$(this.element).scrollTop(this.element.scrollHeight);
	}
	
    // Send message to the server
    this.app.sendMessage(txt, function(){
        // Success
		// chatroom.append('.... ok');
    }, function(){
        // Fail
		chatroom.append('sending fail');
    });
}
ChatView.prototype.receiveMessage = function() {
	// Get others' text from server
	
	
	// HTML add markup
	var chatroom = $(this.element).find('.chatroom');
}