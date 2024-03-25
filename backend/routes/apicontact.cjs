const { Resend } = require('resend');


const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);


//const resend = new Resend('re_cCVh2WoF_6trY1PNSKnq2ixPLDm768HDu');
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

module.exports = router;
