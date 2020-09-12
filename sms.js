const accountSid = 'AC4873cf98544a07d291fb56105ece1b15';
const authToken = 'f0bc8a2851498c048de755c46cc61d43';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Hello World',
     from: '+18043699101',
     to: '+15672076671'
   })
  .then(message => console.log(message.sid));
