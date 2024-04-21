const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-application', (req, res) => {
    const { name, email, financial_info } = req.body;
    console.log('Application Received:', name, email, financial_info);
    res.send('Application submitted successfully!');
});