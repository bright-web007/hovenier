#!/usr/bin/env node

/**
 * Environment Variables Validation Script
 * Checks if all required environment variables are properly set
 * Run with: node scripts/validate-env.js
 */

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

// Load environment variables from .env.local using dotenv
function loadEnvFile() {
  try {
    require('dotenv').config({ path: '.env.local' });
    console.log(chalk.gray(`📁 Loaded environment variables from .env.local\\n`));
  } catch (error) {
    console.log(chalk.yellow(`⚠️  Could not load .env.local file: ${error.message}\\n`));
  }
}

// Environment variables organized by sprint/feature
const environmentConfig = {
  // Sprint 1 - Core Foundation
  core: {
    required: [
      'NEXT_PUBLIC_BASE_URL',
      'NODE_ENV'
    ],
    optional: []
  },
  
  // Sprint 1 - Analytics & Monitoring  
  monitoring: {
    required: [
      'SENTRY_DSN',
      'NEXT_PUBLIC_GA4_MEASUREMENT_ID'
    ],
    optional: [
      'SENTRY_ORG',
      'SENTRY_PROJECT'
    ]
  },
  
  // Sprint 1 - CMS Integration
  cms: {
    required: [
      'MUSE_CMS_API_URL',
      'MUSE_CMS_API_KEY'
    ],
    optional: [
      'MUSE_CMS_USERNAME',
      'MUSE_CMS_PASSWORD',
      'MUSE_CMS_ACCESS_TOKEN'
    ]
  },
  
  // Sprint 3 - Forms & Security
  forms: {
    required: [
      'NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY',
      'CLOUDFLARE_TURNSTILE_SECRET_KEY'
    ],
    optional: [
      'NEXT_PUBLIC_RECAPTCHA_SITE_KEY',
      'RECAPTCHA_SECRET_KEY'
    ]
  },
  
  // Sprint 3 - Email & Notifications
  email: {
    required: [
      'EMAIL_FROM',
      'EMAIL_TO'
    ],
    optional: [
      'RESEND_API_KEY',
      'SENDGRID_API_KEY',
      'SMTP_HOST',
      'EMAIL_CC'
    ]
  },
  
  // Future Sprints - Optional
  optional: {
    required: [],
    optional: [
      'DATABASE_URL',
      'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY',
      'STRIPE_PUBLIC_KEY',
      'OPENAI_API_KEY'
    ]
  }
};

function checkEnvironmentVariables() {
  console.log(chalk.blue.bold('\n🔍 Environment Variables Validation\n'));
  console.log(chalk.gray(`Checking environment: ${process.env.NODE_ENV || 'development'}\n`));
  
  let allValid = true;
  let totalChecked = 0;
  let totalSet = 0;
  
  // Check each category
  for (const [category, config] of Object.entries(environmentConfig)) {
    console.log(chalk.yellow.bold(`📋 ${category.toUpperCase()}`));
    
    let categoryValid = true;
    
    // Check required variables
    for (const varName of config.required) {
      totalChecked++;
      const value = process.env[varName];
      
      if (!value) {
        console.log(chalk.red(`  ❌ ${varName} - Not set`));
        categoryValid = false;
        allValid = false;
      } else if (value.includes('your_') || value.includes('example_') || value.includes('_here')) {
        console.log(chalk.yellow(`  ⚠️  ${varName} - Placeholder value (update for production)`));
        totalSet++; // Count as set for development
      } else {
        console.log(chalk.green(`  ✅ ${varName} - Set`));
        totalSet++;
      }
    }
    
    // Check optional variables
    for (const varName of config.optional) {
      const value = process.env[varName];
      
      if (value && !value.includes('your_') && !value.includes('example_')) {
        console.log(chalk.cyan(`  ℹ️  ${varName} - Set (optional)`));
      } else {
        console.log(chalk.gray(`  ⚪ ${varName} - Not set (optional)`));
      }
    }
    
    console.log('');
  }
  
  // Summary
  console.log(chalk.blue.bold('📊 Summary'));
  console.log(chalk.white(`Total required variables: ${totalChecked}`));
  console.log(chalk.white(`Total set correctly: ${totalSet}`));
  console.log(chalk.white(`Completion: ${Math.round((totalSet / totalChecked) * 100)}%\n`));
  
  if (allValid) {
    console.log(chalk.green.bold('🎉 All required environment variables are set!\n'));
    return true;
  } else {
    console.log(chalk.red.bold('❌ Some required environment variables are missing.\n'));
    console.log(chalk.yellow('📖 See docs/ENVIRONMENT_SETUP.md for setup instructions.\n'));
    return false;
  }
}

function validateSpecificFeatures() {
  console.log(chalk.blue.bold('🧪 Feature-Specific Validation\n'));
  
  // Email configuration validation
  const emailService = getEmailServiceType();
  console.log(chalk.yellow(`📧 Email Service: ${emailService}`));
  
  // CMS authentication validation  
  const cmsAuthType = getCMSAuthType();
  console.log(chalk.yellow(`📝 CMS Auth: ${cmsAuthType}`));
  
  // Environment type validation
  const envType = getEnvironmentType();
  console.log(chalk.yellow(`🌍 Environment: ${envType}\n`));
}

function getEmailServiceType() {
  if (process.env.RESEND_API_KEY) return 'Resend';
  if (process.env.SENDGRID_API_KEY) return 'SendGrid';
  if (process.env.SMTP_HOST) return 'SMTP';
  if (process.env.AWS_SES_ACCESS_KEY_ID) return 'Amazon SES';
  return 'Not configured';
}

function getCMSAuthType() {
  if (process.env.MUSE_CMS_ACCESS_TOKEN) return 'Token-based';
  if (process.env.MUSE_CMS_USERNAME && process.env.MUSE_CMS_PASSWORD) return 'Username/Password';
  if (process.env.MUSE_CMS_API_KEY) return 'API Key only';
  return 'Not configured';
}

function getEnvironmentType() {
  const nodeEnv = process.env.NODE_ENV;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  if (nodeEnv === 'production' && baseUrl?.includes('hovenier.frl')) {
    return 'Production';
  } else if (nodeEnv === 'development' && baseUrl?.includes('localhost')) {
    return 'Development';
  } else if (baseUrl?.includes('staging') || baseUrl?.includes('vercel')) {
    return 'Staging';
  }
  
  return 'Unknown';
}

function showRecommendations() {
  console.log(chalk.blue.bold('💡 Recommendations\n'));
  
  const recommendations = [];
  
  if (!process.env.SENTRY_DSN) {
    recommendations.push('Set up Sentry for error monitoring');
  }
  
  if (!process.env.DATABASE_URL) {
    recommendations.push('Consider setting up a database for lead storage');
  }
  
  if (!process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY) {
    recommendations.push('Add Cloudflare Turnstile for form protection');
  }
  
  if (process.env.NODE_ENV === 'production' && process.env.DEBUG_MODE === 'true') {
    recommendations.push('⚠️  Disable DEBUG_MODE in production');
  }
  
  if (recommendations.length === 0) {
    console.log(chalk.green('✨ No immediate recommendations. Setup looks good!\n'));
  } else {
    recommendations.forEach(rec => {
      console.log(chalk.yellow(`  • ${rec}`));
    });
    console.log('');
  }
}

// Main execution
if (require.main === module) {
  // Load .env.local file first
  loadEnvFile();
  
  const isValid = checkEnvironmentVariables();
  validateSpecificFeatures();
  showRecommendations();
  
  process.exit(isValid ? 0 : 1);
}

module.exports = {
  checkEnvironmentVariables,
  validateSpecificFeatures,
  environmentConfig
};