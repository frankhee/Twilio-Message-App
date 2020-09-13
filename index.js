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

  twiml.message('To learn more about me, feel free to send me a text at 567-207-6671 or shoot me an email at frankheeee@gmail.com!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

//handle outgoing text
app.post('/text', (req, res) => {
  try {
    const number = req.body.requestBody.message;
    const options = {
      from: '+18043699101',
      to: `+1${number}`,
      body: 'Hi there! Super excited to see you visiting my simple Twilio app! To checkout the repo for this project, visit https://github.com/frankhee/Twilio-Message-App. To learn more about my professional experiences, visit https://www.linkedin.com/in/frank-he-a171a1127/.'
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