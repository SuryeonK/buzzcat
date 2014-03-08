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

    $('.button').on('click', function(){
        $.UIGoToArticle('#' + $(this).data('goto'));
    });
}());