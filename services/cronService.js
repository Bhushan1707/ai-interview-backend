const cron = require('node-cron');

const startCron = () => {
  // Runs every 10 minutes
  cron.schedule('*/10 * * * *', () => {
    console.log('cron is running');
  });
};

module.exports = { startCron };
