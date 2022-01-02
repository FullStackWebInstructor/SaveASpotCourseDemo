const express = require('express')
const session = require('express-session');
const UserController = require('./controller/UserController.js').controller;
const SpotController = require('./controller/SpotController.js').controller;
const ViewController = require('./controller/ViewController.js').controller;

const app = express()
const port = 3000

const oneDay = 1000 * 60 * 60 * 24;
app.use(express.json());
app.use(session({
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: oneDay
    }
}));

app.use(express.static('public'))


function authAct(func) {
    return (request, response) => {
        if (request.session.userId === undefined) {
            response.status(403).json({ result: "you need to log in !" });
        } else {
            func(request, response);
        }
    }
}

function globalExceptionHandle(func) {
    return (request, response, next) => {
        func(request, response).catch((e) => {
            console.error(e);
            next(e);
        });
    }
}

app.get('/', (req, res) => new ViewController(req, res).loginPage())
app.get('/register', (req, res) => new ViewController(req, res).registerPage())
app.get('/spots', (req, res) => new ViewController(req, res).spotsPage());

app.post('/login', globalExceptionHandle((request, response) => new UserController(request, response).login()));
app.post('/register', globalExceptionHandle((request, response) => new UserController(request, response).register()));
app.get('/logout', globalExceptionHandle((request, response) => new UserController(request, response).logout()))

app.get('/spots/data/:type', authAct((request, response) => new SpotController(request, response).getSpots()))
app.post("/spots/action/help", authAct((request, response) => new SpotController(request, response).helpSpot()));
app.post("/spots/action/complete", authAct((request, response) => new SpotController(request, response).completeSpot()))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log("hello");
})