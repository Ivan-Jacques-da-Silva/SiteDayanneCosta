
# Database Setup Script

This directory contains scripts for setting up the Real Estate backend database.

## setup-database.js

Automatically sets up PostgreSQL database with the following features:

### What it does:
1. **Installs PostgreSQL** (if not already installed)
2. **Creates database**: `real_estate_db`
3. **Creates user**: `estate_admin` with full privileges
4. **Updates .env file** with all necessary configuration
5. **Runs Prisma commands** to setup schema and seed data
6. **Tests connection** to ensure everything works

### Usage:
```bash
cd Backend
npm run setup
```

### Credentials Created:
- **Database**: `real_estate_db`
- **Username**: `estate_admin`
- **Password**: `RealEstate2024!@#`
- **Postgres Admin Password**: `admin`

### Security Features:
- Strong passwords automatically generated
- User has full database privileges
- All credentials stored securely in .env file
- Connection tested before completion

### Requirements:
- Node.js installed
- sudo access (for PostgreSQL installation)
- Backend dependencies installed (`npm install`)

The script is completely automated and requires no manual input.
