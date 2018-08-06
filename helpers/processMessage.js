const API_AI_TOKEN = 'your Dialogflow Client Access Token';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAADDHclUl6oBAEQiPeFFRqYzZCRJeNiSgMnFiaZAQplokp2hTfwbCVnEMOYN5bJafxVinFIrlf3ZBNrv4DGkVPV7Dpw53sUnuWOngF42E6KgQ56fz2351XJXSELOBLvggFsxeySaDV6ukSzII7y8MP2TfgW5w8nJ9vklYZCDqgZDZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: 'POST',
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};
module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};
