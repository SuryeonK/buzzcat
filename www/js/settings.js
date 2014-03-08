
function ProfileView(app, element){
    this.app = app;
    this.element = element;
	this.loadProfile();
}

ProfileView.prototype.loadProfile = function(){
	$(this.element).find('#myname').val(this.app.my_profile.name);
	$(this.element).find('#mymessage').val(this.app.my_profile.message);
	$(this.element).find('#mypicture').attr('src', 'img/'+this.app.my_profile.picture +'.png');
}

ProfileView.prototype.saveProfile = function(){
	console.log(this.app);
	console.log(this);
	this.app.my_profile.name = $(this.element).find('#myname').val();
	this.app.my_profile.message = $(this.element).find('#mymessage').val();
	this.app.my_profile.picture = $(this.element).find('#mypicture').attr('src');
	this.app.saveProfile();
}

function SettingsView(app, element){
    this.app = app;
    this.element = element;
	this.loadData();
}

SettingsView.prototype.loadData = function(){
	$(this.element).find('#privatemsg').val(this.app.my_profile.privatemsg);
	$(this.element).find('#autoconn').val(this.app.my_profile.autoconn);
	$(this.element).find('#showlocation').val(this.app.my_profile.showlocation);
}

SettingsView.prototype.saveData = function(){
	this.app.my_profile.privatemsg = $(this.element).find('#privatemsg').val();
	this.app.my_profile.showlocation = $(this.element).find('#showlocation').val();
	this.app.my_profile.autoconn = $(this.element).find('#autoconn').val();	
	this.app.saveProfile();
}

function NotificationsView(app, element){
    this.app = app;
    this.element = element;
	this.loadData();
}

NotificationsView.prototype.loadData = function(){
	$(this.element).find('#sound').attr('checked', this.app.my_profile.sound);
	$(this.element).find('#vibration').attr('checked', this.app.my_profile.vibration);
}

NotificationsView.prototype.saveData = function(){
	this.app.my_profile.sound = $(this.element).find('#sound').val();
	this.app.my_profile.vibration = $(this.element).find('#vibration').val();
	this.app.saveProfile();
}
