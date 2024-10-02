const cron = require('node-cron');
const axios = require('axios');

cron.schedule('*/60 * * * * *', async () => {
  try {
    await axios.get('http://127.0.0.1:8888/api/scheduler');
  } catch (e) {
    console.error(e);
  }
});
