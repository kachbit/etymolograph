const express = require('express');
const app = express();
var q = "mellifluous";
app.get('/', (req, res) => {
  const https = require('https');

  const options = {
    hostname: 'od-api.oxforddictionaries.com',
    path: '/api/v2/entries/en-us/'+q,
    headers: {
      app_id: '',
      app_key: '',
    },
  };

  https.get(options, response => {
    let result = '';
    response.on('data', chunk => {
      result += chunk;
    });

    response.on('end', () => {
        console.log(result)
      result = JSON.parse(result)['results'][0]['lexicalEntries'][0]['entries'][0]['etymologies'][0];
      res.send(q+" - "+result);
    });
  });
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`helloworld:   on port ${port}`);
});
