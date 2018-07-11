const express = require('express');
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());

sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

server.get('/', (req, res) => {
    res.send('intropage');
});

server.post('/main', function(req, res) {
    var email = {
        to: 'riddena01@gmail.com',
        from: 'nr10@albion.edu',
        subject: 'New message from ' + req.body.name + ' --- ID:' + req.body.id,
        text: req.body.message + ' Email: ' + req.body.email,
    };
    sendgrid.send(email)
    .then(() => {
        res.status(200).json(req).end();
    })
    .catch((err) => {
            res.status(500).json({error: err}).end();
    })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`\n== API Running on port ${PORT} ==\n`));