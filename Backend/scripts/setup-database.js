
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Database configuration
const DB_CONFIG = {
  host: 'localhost',
  port: 5432,
  database: 'real_estate_db',
  username: 'estate_admin',
  password: 'RealEstate2024!@#'
};

const POSTGRES_PASSWORD = 'admin';

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
    // Try to check if PostgreSQL is installed on Windows
    await executeCommand('psql --version', 'Checking PostgreSQL version');
    console.log('✅ PostgreSQL is installed');
    return true;
  } catch (error) {
    console.log('❌ PostgreSQL not found in PATH');
    
    // Try common PostgreSQL installation paths on Windows
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
  console.log('🧹 Cleaning up existing database and user...');
  
  const psql = getPsqlCommand();
  
  try {
    // Set PGPASSWORD environment variable for authentication
    const env = { ...process.env, PGPASSWORD: POSTGRES_PASSWORD };
    
    // Drop database if exists
    await new Promise((resolve, reject) => {
      exec(`${psql} -h localhost -U postgres -c "DROP DATABASE IF EXISTS ${DB_CONFIG.database};"`, { env }, (error, stdout, stderr) => {
        if (error && !error.message.includes('does not exist')) {
          console.log('⚠️  Database drop had issues (normal if it didn\'t exist)');
        }
        resolve();
      });
    });

    // Drop user if exists
    await new Promise((resolve, reject) => {
      exec(`${psql} -h localhost -U postgres -c "DROP USER IF EXISTS ${DB_CONFIG.username};"`, { env }, (error, stdout, stderr) => {
        if (error && !error.message.includes('does not exist')) {
          console.log('⚠️  User drop had issues (normal if it didn\'t exist)');
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
  console.log('🔧 Setting up database and user...');
  
  const psql = getPsqlCommand();
  const env = { ...process.env, PGPASSWORD: POSTGRES_PASSWORD };
  
  try {
    // Create user with all possible permissions
    await new Promise((resolve, reject) => {
      const createUserCmd = `${psql} -h localhost -U postgres -c "CREATE USER ${DB_CONFIG.username} WITH PASSWORD '${DB_CONFIG.password}' SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN REPLICATION BYPASSRLS;"`;
      exec(createUserCmd, { env }, (error, stdout, stderr) => {
        if (error && !error.message.includes('already exists')) {
          reject(error);
          return;
        }
        console.log('✅ User created with full permissions');
        resolve();
      });
    });

    // Create database
    await new Promise((resolve, reject) => {
      const createDbCmd = `${psql} -h localhost -U postgres -c "CREATE DATABASE ${DB_CONFIG.database} OWNER ${DB_CONFIG.username};"`;
      exec(createDbCmd, { env }, (error, stdout, stderr) => {
        if (error && !error.message.includes('already exists')) {
          reject(error);
          return;
        }
        console.log('✅ Database created successfully');
        resolve();
      });
    });

    // Grant all privileges on database
    await new Promise((resolve, reject) => {
      const grantCmd = `${psql} -h localhost -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_CONFIG.database} TO ${DB_CONFIG.username};"`;
      exec(grantCmd, { env }, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        console.log('✅ Database privileges granted');
        resolve();
      });
    });

    // Grant schema privileges
    await new Promise((resolve, reject) => {
      const grantSchemaCmd = `${psql} -h localhost -U postgres -d ${DB_CONFIG.database} -c "GRANT ALL ON SCHEMA public TO ${DB_CONFIG.username};"`;
      exec(grantSchemaCmd, { env }, (error, stdout, stderr) => {
        if (error) {
          console.log('⚠️  Schema privileges warning (normal for new database)');
        } else {
          console.log('✅ Schema privileges granted');
        }
        resolve();
      });
    });

    // Grant sequence privileges
    await new Promise((resolve, reject) => {
      const grantSeqCmd = `${psql} -h localhost -U postgres -d ${DB_CONFIG.database} -c "GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO ${DB_CONFIG.username};"`;
      exec(grantSeqCmd, { env }, (error, stdout, stderr) => {
        if (error) {
          console.log('⚠️  Sequence privileges warning (normal for new database)');
        } else {
          console.log('✅ Sequence privileges granted');
        }
        resolve();
      });
    });

    // Grant table privileges  
    await new Promise((resolve, reject) => {
      const grantTableCmd = `${psql} -h localhost -U postgres -d ${DB_CONFIG.database} -c "GRANT ALL ON ALL TABLES IN SCHEMA public TO ${DB_CONFIG.username};"`;
      exec(grantTableCmd, { env }, (error, stdout, stderr) => {
        if (error) {
          console.log('⚠️  Table privileges warning (normal for new database)');
        } else {
          console.log('✅ Table privileges granted');
        }
        resolve();
      });
    });

    console.log('✅ Database and user setup completed');
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
  // Escape special characters in password for URL
  const escapedPassword = encodeURIComponent(DB_CONFIG.password);
  const databaseUrl = `postgresql://${DB_CONFIG.username}:${escapedPassword}@${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`;

  const envContent = `# Database Configuration
DATABASE_URL="${databaseUrl}"

# JWT Configuration
JWT_SECRET="RealEstateJWT2024SecretKey!@#$%"

# Server Configuration
PORT=3001
NODE_ENV=development

# Database Details
DB_HOST=${DB_CONFIG.host}
DB_PORT=${DB_CONFIG.port}
DB_NAME=${DB_CONFIG.database}
DB_USER=${DB_CONFIG.username}
DB_PASSWORD=${DB_CONFIG.password}
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

    await executeCommand(`cd /d "${backendPath}" && npx prisma generate`, 'Generating Prisma client');
    await executeCommand(`cd /d "${backendPath}" && npx prisma db push`, 'Pushing database schema');
    await executeCommand(`cd /d "${backendPath}" && npm run prisma:seed`, 'Seeding database');

    console.log('✅ Prisma setup completed');
  } catch (error) {
    console.error('❌ Failed to run Prisma commands:', error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting Real Estate Database Setup for Windows...\n');

  try {
    // Check PostgreSQL installation
    await checkPostgreSQL();

    // Cleanup existing setup
    await cleanupExisting();

    // Setup database and user
    await setupDatabase();

    // Test connection
    await testConnection();

    // Update .env file
    await updateEnvFile();

    // Run Prisma commands
    await runPrismaCommands();

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📊 Database Configuration:');
    console.log(`   Database: ${DB_CONFIG.database}`);
    console.log(`   User: ${DB_CONFIG.username}`);
    console.log(`   Password: ${DB_CONFIG.password}`);
    console.log(`   Host: ${DB_CONFIG.host}`);
    console.log(`   Port: ${DB_CONFIG.port}`);
    console.log('\n🔐 All credentials stored in .env file');
    console.log('\n▶️  You can now start the backend server with: npm run dev');

  } catch (error) {
    console.error('\n💥 Setup failed:', error.message);
    console.log('\n🔧 Please ensure PostgreSQL is installed and the postgres user password is "admin"');
    console.log('🔧 If PostgreSQL is not installed, download it from: https://www.postgresql.org/download/windows/');
    process.exit(1);
  }
}

// Run the setup
if (require.main === module) {
  main();
}

module.exports = { main, DB_CONFIG };
