const User = require('../modals/user');
async function createAdminUser() {
    const adminEmail ='admin@cabservices.com';
     const existingAdmin = await User.findOne({ email: adminEmail, role: 'admin' });
    if (!existingAdmin) {
        const admin = new User({
            name: 'Admin',
            email: adminEmail,
            password : 'adminpassword',
            role:'admin',
            phone: '1234567890'
            });
            await admin.save ();
            console.log('Admin user created successfully');
        } else {
            console.log('Admin user already exists');
        }
}
module.exports = createAdminUser;
