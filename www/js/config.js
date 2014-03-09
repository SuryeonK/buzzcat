(function(){
    var DateFormats = {
       short: "DD MMMM - YYYY",
       long: "dddd DD.MM.YYYY HH:mm"
    };
    Handlebars.registerHelper("formatDate", function(date) {
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
	    return hour + ":" + min + " " + mid;
    });
    
    Handlebars.registerHelper('breaklines', function(text) {
        text = Handlebars.Utils.escapeExpression(text);
        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
        return new Handlebars.SafeString(text);
    });

    $('.button').on('click', function(){
        if(!$(this).data('goto')) return;
        $.UIGoToArticle($(this).data('goto'));
    });
}());