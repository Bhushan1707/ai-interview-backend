require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_USERNAME || process.env.DB_USERNAME,
    password: process.env.DEV_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.DEV_DATABASE || process.env.DB_NAME,
    host: process.env.DEV_HOST || process.env.DB_HOST,
    port: process.env.DEV_PORT || process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST || 'database_test',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'database_production',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false
  }
};
