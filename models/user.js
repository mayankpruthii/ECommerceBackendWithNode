const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        required: false,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    // TODO: comeback here
    encry_password: {
        type: String,
        required: true,
        trim: false
    },
    salt: String,
    // What role do you have i.e privileges: admin, contributor etc
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, {timestamps: true});

userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.secure_password(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods = {

    secure_password: function(plainpassword){
        if(!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                    .update(plainpassword)
                    .digest('hex');
        } catch (error) {
            return "";
        }
    },
    
    authenticate: function(plainpassword){
        return this.secure_password(plainpassword) === this.encry_password;
    }

};

module.exports = mongoose.model("User", userSchema);