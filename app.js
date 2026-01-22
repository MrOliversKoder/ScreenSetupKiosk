const express = require('express');
const app = express();
const port = 3000;


// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/Home');
});


// Checks if the server is running
app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
});