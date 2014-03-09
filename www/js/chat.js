// Chat view controller
function ChatView(app, element){
    this.app = app;
    this.element = element;
	this.toolbar = $(element).next().get(0);
	// Templates
	this.msg_template = Handlebars.compile($('#message-template').html());
	// Bind events
	$(document).on('NEW_MESSAGE', $.proxy( this.receiveMessage, this));
	$(this.toolbar).find('textarea').on('keyup', function(){
	    this.style.height = "";
	    this.style.height = Math.min(this.scrollHeight, 150) + "px";
	});
	$(this.toolbar).find('.messageSendButton').on( "click", $.proxy( this.sendMessage, this));
	
	var isOpenEmoticonBar = false;
	$('#showEmoticons').click(function(){
		if (isOpenEmoticonBar == false) {
			$('#emoticons').slideDown("slow");
			isOpenEmoticonBar = true;
		}
		else {
			$('#emoticons').slideUp("slow");
			isOpenEmoticonBar = false;
		}
	});
	$('#emoticons').on('click', 'img', function(){
			$('#message').val($('#message').val()+' '+$(this).data('symbol'));
	});
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
    });
}
ChatView.prototype.receiveMessage = function(msg) {
    msg.mine = false;
	chatroom.append(this.msg_template(msg));
	$(this.element).scrollTop(this.element.scrollHeight);
}