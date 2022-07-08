const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// I don't need static files for this app

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(' 🌎 Connected to Mongoose server 🌎 ')
    })
    .catch(err => {
        console.log('Error connecting to Mongoose server');
        console.log(err);
    });

// This to log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(` 🌎 Connected on http://localhost:${PORT} 🌎 `));
