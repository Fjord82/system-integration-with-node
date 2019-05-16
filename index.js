const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('System-integration exams project');
});

app.listen(port, () => {
    console.log(`Testing 123, Testing 123 ${port}!`);
});