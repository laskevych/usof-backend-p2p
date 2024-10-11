const session = require('express-session');
const config = require('./config.json');
const express = require('express');
const path = require('path');

const userRouter = require('./routes/userRoutes');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: config.sessionSalt,
    cookie: {
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    },
}));

// Add jwtMiddleware
app.use('/api/users/', userRouter);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});