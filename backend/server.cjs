const { Resend } = require('resend');

const axios = require('axios');
const express = require('express');
const cors = require('cors');
const liveMatchesRouter = require('./routes/apifootball.cjs'); 
const authRouter = require('./routes/authentication.cjs');
const newsRouter = require('./routes/jsonactus.cjs');
const path = require('path'); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();

app.use('/footballapi', liveMatchesRouter);

app.use('/auth', authRouter);

app.use('/news', newsRouter);



app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("An error occurred");
});

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);


//const resend = new Resend('re_cCVh2WoF_6trY1PNSKnq2ixPLDm768HDu');
const resend = new Resend('re_c96X2TME_JchgPHgohxe2ZayAuHyGTsgY');
app.post('/contact', async (req, res) => {
    try {
        const { from, to, subject, html } = req.body;

        // Assurez-vous que les champs nécessaires sont présents
        if (!from || !to || !subject || !html) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await resend.emails.send({
            from: `Acme <${from}>`,
            to: [to], // Assurez-vous que 'to' est un tableau
            subject: subject,
            html: html,
        });

        res.status(201).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.use('/', router);



app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
