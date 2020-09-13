const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 7000;
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

//middleware 
app.use(cors());
app.use(express.json());

//handle incoming text 
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('To contact Frank He, please call or text: 567-207-6671');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

//handle outgoing text
app.post('/text', (req, res) => {
  try {
    const options = {
      from: '+18043699101',
      to: `+1${req.body.requestBody.message}`,
      body: 'Hello World'
    }
    client.messages.create(options, function(err, response) {
      if(err) {
        console.error(err);
      } else {
        console.log("Message sent successfully!")
      }
    })
  } catch (error) {
    console.error(error.message);
  }
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(port, function () {
  console.log(`Server has started on port ${port}!`);
});