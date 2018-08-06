module.exports = (req, res) => {
 const hubChallenge = req.query['hub.challenge'];
const hubMode = req.query['hub.mode'];
console.log(req.query['hub.verify_token']);
 const verifyTokenMatches = (req.query['hub.verify_token'] === 'chaalisa');
if (hubMode && verifyTokenMatches) {
 res.status(200).send(hubChallenge);
 } else {
 res.status(403).end();
 }
};
