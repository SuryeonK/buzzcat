function showAlert() {
	this.app = app;
    this.element = element;
	navigator.notification.alert(
		'You have a new message from' + this.app.my_location  // message
	);
}
function playBeep() {
	this.app = app;
    this.element = element;
	navigator.notification.beep(1);
}
function vibrate() {
	this.app = app;
    this.element = element;
	navigator.notification.vibrate(1000);
}
