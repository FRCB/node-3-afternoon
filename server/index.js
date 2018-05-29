require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , mid = require('./middlewares/checkForSession')
    , swagCtrl = require('./controllers/swag_controller')
    , authCtrl = require('./controllers/auth_controller')
    , cartCtrl = require('./controllers/cart_controller')
    , searchCtrl = require('./controllers/search_controller')

const app = express();

let { SERVER_PORT, SESSION_SECRET } = process.env;

// first step - set BodyParder
app.use(bodyParser.json());

//second step - set the Session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

//third step - set the MiddleWare
app.use(mid.checkForSession)
app.use(express.static(`node-3-afternoon/build`))

//endpoints
app.get('/api/swag', swagCtrl.read);
app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/signout', authCtrl.signout);
app.get('/api/user', authCtrl.getUser);
app.post('/api/cart', cartCtrl.add);
app.post('/api/cart/checkout', cartCtrl.checkout);
app.delete('/api/cart', cartCtrl.delete);
app.get('/api/search', searchCtrl.search); // e.g. http://localhost:3000/api/search?category=pants



app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})