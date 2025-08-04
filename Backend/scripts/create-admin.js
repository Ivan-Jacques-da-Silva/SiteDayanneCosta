const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('🔄 Starting admin creation process...');

    // Test database connection first
    await prisma.$connect();
    console.log('✅ Database connection established');

    // First, delete existing admin if exists
    const deletedUsers = await prisma.user.deleteMany({
      where: { 
        OR: [
          { email: 'admin@dayannecosta.com' },
          { role: 'ADMIN' }
        ]
      }
    });

    console.log(`🗑️ Deleted ${deletedUsers.count} existing admin users`);

    // Hash the password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash('admin123', 12);
    console.log('✅ Password hashed successfully');

    // Create admin user
    console.log('👤 Creating admin user...');
    const admin = await prisma.user.create({
      data: {
        name: 'Administrator',
        email: 'admin@dayannecosta.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@dayannecosta.com');
    console.log('🔑 Password: admin123');
    console.log('👑 Role: ADMIN');
    console.log('🆔 User ID:', admin.id);
    console.log('📅 Created at:', admin.createdAt);

    // Verify the user was created correctly
    const verifyUser = await prisma.user.findUnique({
      where: { email: 'admin@dayannecosta.com' }
    });

    console.log('🔍 Verification - User exists:', !!verifyUser);
    console.log('🔍 Verification - Has password:', !!verifyUser?.password);
    console.log('🔍 Verification - Role:', verifyUser?.role);

  } catch (error) {
    console.error('❌ Error creating admin:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Database connection closed');
  }
}

createAdmin();