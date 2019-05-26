//Model for activities
const mongoose = require('mongoose'), 
autoIncrement = require('mongoose-auto-increment'),
Schema = mongoose.Schema,
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

var UsersSchema = new Schema({
    userName: {type: String, required: true, index: {unique: true}, lowercase: true},
    email: {type:String, required:true, unique:true, lowercase: true},
    password: {type:String, required:true},
    isVerified: {type:Boolean, default:false},
    token: String,
    lang: String,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    country: String,
    pincode: Number,
    currency: String
},{collection: 'users'});

autoIncrement.initialize(mongoose.connection);
UsersSchema.plugin(autoIncrement.plugin, {model: 'Users', startAt: 1000});

//Hashing the password before update into DB
UsersSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UsersSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UsersSchema.methods.updatePassword = function(password){
    //  // generate a salt
    //  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    //     if (err) return err;

    //     // hash the password using our new salt
    //     bcrypt.hash(password, salt, function(err, hash) {
    //         if (err) return err;

    //         // override the cleartext password with the hashed one
    //         return hash;
    //     });
    // });

    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR));
}

var UsersModel = mongoose.model('Users', UsersSchema);


module.exports = UsersModel;