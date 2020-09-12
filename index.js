const express = require('express');
const app = express();
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('To contact Frank He, please call or text: 567-207-6671');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});


app.listen(7000, function () {
  console.log('Server has started on port 7000!');
});