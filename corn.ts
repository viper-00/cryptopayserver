const cron = require('node-cron');

cron.schedule('*/10 * * * * *', () => {
  console.log('test time of cron');
});
