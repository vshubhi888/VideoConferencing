const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Add this line to import bcrypt


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['host', 'guest', 'admin'], default: 'guest' },
    phone: String,
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

//hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//password comparison method
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
