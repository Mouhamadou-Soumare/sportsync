import fs from 'fs/promises'; // Utiliser fs.promises pour les opérations asynchrones sur le système de fichiers
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import liveMatchesRouter from './routes/apifootball.js';
import authRouter from './routes/authentication.js';
import * as newsRouter from './routes/jsonactus.js'; // Importer toutes les fonctionnalités exportées de jsonactus.js
import path from 'path';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(new URL('.', import.meta.url).pathname, 'public'))); 

const router = express.Router();

app.use('/footballapi', liveMatchesRouter);
app.use('/auth', authRouter);
app.use('/news', newsRouter.default); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://mangi-client.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("An error occurred");
});

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const resend = new Resend('re_c96X2TME_JchgPHgohxe2ZayAuHyGTsgY');
app.post('/contact', async (req, res) => {
    try {
        const { from, to, subject, html } = req.body;

        if (!from || !to || !subject || !html) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await resend.emails.send({
            from: `Acme <${from}>`,
            to: [to],
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
