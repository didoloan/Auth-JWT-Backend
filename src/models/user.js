const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const beneficiarySchema = new Schema({
    bank_code: {type:String, required:true},
    acct_no: {type:String, required:true}
})

const userSchema = new Schema({
    fname: {type:String, required:true},
    lname: {type:String, required:true},
    email: {type:String, unique:true, required:true},
    dob: {type:Date, required:true},
    password: {type:String, required:true},
    joined: {type:Date, default: Date.now},
    interests: [String],
    hobbies: [String]
})

userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}

userSchema.methods.fullname = function() {
    return `${this.fname} ${this.lname}`;
}

userSchema.pre('save', async function(next){
    try {
        if(this.isNew || this.isModified('password')){
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
})

const newrating = (oldrating, ratingCount, newRating) => {
    return (oldrating*count+newRating)/(count+1);
}


const User = mongoose.model('User', userSchema);

module.exports = User;