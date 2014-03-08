
// Main application
var app = {    
    // Create a profile given the data
    createProfile: function(profile){
        if(this.my_profile || localStorage.my_profile_id){
            throw 'Profile already exists';
        }
        var col = this.db.col('profiles');
        localStorage.my_profile_id = col.insert(profile);
        this.my_profile = profile;
        // TODO: Send AJAX
    },
    
    // Application Constructor
    initialize: function() {
        // Initialize DB
        var con = new Chongo.Connection(localStorage);
        this.db = con.db('buzzCat');
        
        // Show view depending on status
    }
};
