
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Database configuration
const DB_CONFIG = {
  host: 'localhost',
  port: 5432,
  database: 'real_estate_db',
  username: 'postgres',
  password: 'admin'
};

function executeCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`🔄 ${description}...`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr && !stderr.includes('NOTICE') && !stderr.includes('WARNING') && !stderr.includes('already exists')) {
        console.error(`⚠️  Warning: ${stderr}`);
      }
      if (stdout) {
        console.log(`✅ ${description} completed`);
      }
      resolve(stdout);
    });
  });
}

async function checkPostgreSQL() {
  console.log('🔍 Checking PostgreSQL installation...');
  
  try {
    await executeCommand('psql --version', 'Checking PostgreSQL version');
    console.log('✅ PostgreSQL is installed');
    return true;
  } catch (error) {
    console.log('❌ PostgreSQL not found in PATH');
    
    const commonPaths = [
      'C:\\Program Files\\PostgreSQL\\16\\bin\\psql.exe',
      'C:\\Program Files\\PostgreSQL\\15\\bin\\psql.exe',
      'C:\\Program Files\\PostgreSQL\\14\\bin\\psql.exe',
      'C:\\Program Files\\PostgreSQL\\13\\bin\\psql.exe',
      'C:\\Program Files (x86)\\PostgreSQL\\16\\bin\\psql.exe',
      'C:\\Program Files (x86)\\PostgreSQL\\15\\bin\\psql.exe'
    ];
    
    for (const psqlPath of commonPaths) {
      try {
        if (fs.existsSync(psqlPath)) {
          console.log(`✅ Found PostgreSQL at: ${psqlPath}`);
          process.env.PSQL_PATH = psqlPath.replace('psql.exe', '');
          return true;
        }
      } catch (err) {
        continue;
      }
    }
    
    throw new Error('PostgreSQL not found. Please install PostgreSQL first.');
  }
}

function getPsqlCommand() {
  if (process.env.PSQL_PATH) {
    return `"${process.env.PSQL_PATH}psql.exe"`;
  }
  return 'psql';
}

async function cleanupExisting() {
  console.log('🧹 Cleaning up existing database...');
  
  const psql = getPsqlCommand();
  
  try {
    const env = { ...process.env, PGPASSWORD: DB_CONFIG.password };
    
    await new Promise((resolve, reject) => {
      exec(`${psql} -h localhost -U postgres -c "DROP DATABASE IF EXISTS ${DB_CONFIG.database};"`, { env }, (error, stdout, stderr) => {
        if (error && !error.message.includes('does not exist')) {
          console.log('⚠️  Database drop had issues (normal if it didn\'t exist)');
        }
        resolve();
      });
    });

    console.log('✅ Cleanup completed');
  } catch (error) {
    console.log('⚠️  Cleanup had some issues (this is normal if nothing existed)');
  }
}

async function setupDatabase() {
  console.log('🔧 Setting up database...');
  
  const psql = getPsqlCommand();
  const env = { ...process.env, PGPASSWORD: DB_CONFIG.password };
  
  try {
    await new Promise((resolve, reject) => {
      const createDbCmd = `${psql} -h localhost -U postgres -c "CREATE DATABASE ${DB_CONFIG.database};"`;
      exec(createDbCmd, { env }, (error, stdout, stderr) => {
        if (error && !error.message.includes('already exists')) {
          reject(error);
          return;
        }
        console.log('✅ Database created successfully');
        resolve();
      });
    });

    console.log('✅ Database setup completed');
  } catch (error) {
    console.error('❌ Failed to setup database:', error.message);
    throw error;
  }
}

async function testConnection() {
  console.log('🔍 Testing database connection...');
  
  const psql = getPsqlCommand();
  const env = { ...process.env, PGPASSWORD: DB_CONFIG.password };
  
  try {
    await new Promise((resolve, reject) => {
      const testCmd = `${psql} -h ${DB_CONFIG.host} -p ${DB_CONFIG.port} -U ${DB_CONFIG.username} -d ${DB_CONFIG.database} -c "SELECT version();"`;
      exec(testCmd, { env }, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        console.log('✅ Database connection successful');
        resolve();
      });
    });
  } catch (error) {
    console.error('❌ Failed to connect to database:', error.message);
    throw error;
  }
}

async function updateEnvFile() {
  console.log('📝 Updating .env file...');

  const envPath = path.join(__dirname, '..', '.env');
  const databaseUrl = `postgresql://${DB_CONFIG.username}:${DB_CONFIG.password}@${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`;

  const envContent = `# Database Configuration - PostgreSQL
DATABASE_URL="${databaseUrl}"

# JWT Configuration
JWT_SECRET="RealEstateJWT2024SecretKey!@#$%^&*()"

# Server Configuration
PORT=5000
NODE_ENV=development

# Database Details
DB_HOST=${DB_CONFIG.host}
DB_PORT=${DB_CONFIG.port}
DB_NAME=${DB_CONFIG.database}
DB_USER=${DB_CONFIG.username}
DB_PASSWORD=${DB_CONFIG.password}

# Upload Configuration
UPLOAD_PATH=uploads/
MAX_FILE_SIZE=10485760
`;

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file updated successfully');
    console.log('📝 Database URL created:', databaseUrl);
  } catch (error) {
    console.error('❌ Failed to update .env file:', error.message);
    throw error;
  }
}

async function runPrismaCommands() {
  console.log('🔄 Running Prisma commands...');

  try {
    const backendPath = path.join(__dirname, '..');

    // Generate Prisma client
    await executeCommand(`cd "${backendPath}" && npx prisma generate`, 'Generating Prisma client');
    
    // Push database schema
    await executeCommand(`cd "${backendPath}" && npx prisma db push`, 'Pushing database schema');

    console.log('✅ Prisma setup completed');
  } catch (error) {
    console.error('❌ Failed to run Prisma commands:', error.message);
    throw error;
  }
}

async function createAdminUser() {
  console.log('👤 Creating admin user...');

  try {
    // Import Prisma Client dynamically after generation
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection established for admin creation');

    // Delete existing admin users
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

    // Verify the user was created
    const verifyUser = await prisma.user.findUnique({
      where: { email: 'admin@dayannecosta.com' }
    });

    console.log('🔍 Verification - User exists:', !!verifyUser);
    console.log('🔍 Verification - Role:', verifyUser?.role);

    await prisma.$disconnect();
    console.log('🔌 Database connection closed');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    throw error;
  }
}

async function seedBasicData() {
  console.log('🌱 Seeding basic data...');

  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    await prisma.$connect();

    // Create basic amenities
    const amenities = [
      { name: 'Swimming Pool', category: 'Recreation', icon: '🏊' },
      { name: 'Fitness Center', category: 'Recreation', icon: '🏋️' },
      { name: 'Concierge', category: 'Service', icon: '🛎️' },
      { name: 'Valet Parking', category: 'Parking', icon: '🚗' },
      { name: 'Spa', category: 'Wellness', icon: '🧘' },
      { name: 'Tennis Court', category: 'Recreation', icon: '🎾' },
      { name: 'Business Center', category: 'Business', icon: '💼' },
      { name: 'Rooftop Deck', category: 'Outdoor', icon: '🏢' }
    ];

    for (const amenity of amenities) {
      await prisma.amenity.upsert({
        where: { name: amenity.name },
        update: {},
        create: amenity
      });
    }

    // Create basic features
    const features = [
      { name: 'Marble Floors', category: 'Flooring' },
      { name: 'Hardwood Floors', category: 'Flooring' },
      { name: 'Granite Countertops', category: 'Kitchen' },
      { name: 'Stainless Steel Appliances', category: 'Kitchen' },
      { name: 'Walk-in Closet', category: 'Bedroom' },
      { name: 'Master Suite', category: 'Bedroom' },
      { name: 'En-suite Bathroom', category: 'Bathroom' },
      { name: 'Floor-to-Ceiling Windows', category: 'Windows' },
      { name: 'Private Balcony', category: 'Outdoor' },
      { name: 'Central Air Conditioning', category: 'HVAC' }
    ];

    for (const feature of features) {
      await prisma.feature.upsert({
        where: { name: feature.name },
        update: {},
        create: feature
      });
    }

    console.log('✅ Basic data seeded successfully');
    await prisma.$disconnect();

  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting Complete Real Estate Database Setup...\n');

  try {
    // Check PostgreSQL installation
    await checkPostgreSQL();

    // Cleanup existing setup
    await cleanupExisting();

    // Setup database
    await setupDatabase();

    // Test connection
    await testConnection();

    // Update .env file
    await updateEnvFile();

    // Run Prisma commands
    await runPrismaCommands();

    // Create admin user
    await createAdminUser();

    // Seed basic data
    await seedBasicData();

    console.log('\n🎉 Complete database setup finished successfully!');
    console.log('\n📊 Database Configuration:');
    console.log(`   Database: ${DB_CONFIG.database}`);
    console.log(`   User: ${DB_CONFIG.username}`);
    console.log(`   Password: ${DB_CONFIG.password}`);
    console.log(`   Host: ${DB_CONFIG.host}`);
    console.log(`   Port: ${DB_CONFIG.port}`);
    console.log('\n👤 Admin User Created:');
    console.log('   Email: admin@dayannecosta.com');
    console.log('   Password: admin123');
    console.log('\n🔐 All credentials stored in .env file');
    console.log('\n▶️  You can now start the backend server with: npm run dev');
    console.log('🌐 Frontend login: Use the admin credentials above');

  } catch (error) {
    console.error('\n💥 Setup failed:', error.message);
    console.log('\n🔧 Please ensure PostgreSQL is installed and running');
    console.log('🔧 Make sure postgres user password is "admin"');
    console.log('🔧 If PostgreSQL is not installed, download it from: https://www.postgresql.org/download/');
    process.exit(1);
  }
}

// Run the setup
if (require.main === module) {
  main();
}

module.exports = { main, DB_CONFIG };
