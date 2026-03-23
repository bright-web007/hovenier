#!/usr/bin/env node

/**
 * Environment Variables Validation Script (Zod-powered)
 * Uses Zod schemas for comprehensive environment validation
 * Run with: node scripts/validate-env.js
 */

const path = require('path');
const chalk = require('chalk');

// Load environment variables first
function loadEnvFile() {
  try {
    require('dotenv').config({ path: '.env.local' });
    console.log(chalk.gray('📁 Loaded environment variables from .env.local\n'));
  } catch (error) {
    console.log(chalk.yellow(`⚠️  Could not load .env.local file: ${error.message}\n`));
  }
}

async function main() {
  console.log(chalk.blue.bold('🔍 Environment Variables Validation (Zod-powered)\n'));
  
  // Load environment file
  loadEnvFile();
  
  try {
    // Import and run Zod-based validation
    // Using dynamic import to handle ESM/CJS issues
    const { execSync } = require('child_process');
    
    // Compile and run the TypeScript validation
    console.log(chalk.gray('Compiling and validating environment schema...\n'));
    
    const result = execSync('npx tsx lib/env.ts', { 
      encoding: 'utf8',
      cwd: process.cwd(),
      stdio: 'pipe'
    });
    
    console.log(result);
    console.log(chalk.green.bold('🎉 All environment variables validated successfully!\n'));
    
    // Additional summary
    const envCount = Object.keys(process.env).filter(key => 
      !key.startsWith('npm_') && 
      !key.startsWith('_') && 
      key !== 'PATH' &&
      key !== 'PWD'
    ).length;
    
    console.log(chalk.blue(`📊 Total environment variables loaded: ${envCount}`));
    console.log(chalk.green(`✅ Environment: ${process.env.NODE_ENV || 'development'}\n`));
    
  } catch (error) {
    console.error(chalk.red.bold('❌ Environment validation failed!\n'));
    console.error(error.stdout || error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error(chalk.red('\n💥 Validation script crashed:'));
    console.error(error);
    process.exit(1);
  });
}