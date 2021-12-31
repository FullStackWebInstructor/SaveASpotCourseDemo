const express = require('express')
const session = require('express-session');

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

app.get('/', (req, res) => {
    if (req.session.userId === undefined) {
        res.sendFile("login.html", {
            root: "./view"
        });
    } else {
        res.redirect("/spots");
    }
})

app.get('/register', (req, res) => {
    res.sendFile("register.html", {
        root: "./view"
    });
})

app.get('/spots', (req, res) => {
    if (req.session.userId === undefined) {
        res.redirect("/");
    } else {
        res.sendFile("spots.html", {
            root: "./view"
        });
    }
})

app.post('/login', (request, response) => {
    if (request.body.email === "abc@saveaspot.com" && request.body.password === "1234567") {
        request.session.userId = request.body.email;
        response.status(200).json({ result: "success" });
    } else {
        response.status(403).json({ result: "wrong email or password" });
    }
});

app.post('/register', (request, response) => {
    response.status(200).json({ result: "successful register" });
});

app.get('/spots/data/:type', (request, response) => {
    // :type can be one of ["all", "requested_by_me", "worked_by_me"]

    if (request.session.userId === undefined) {
        response.status(403).json({ result: "you must login first! "})
    } else {
        response.status(200).json({
            spots: [
                {
                    id: 1,
                    requester: "abc@saveaspot.com",
                    time: "2021-10-01 9:00",
                    location: "UBC IKB 2nd floor east side, any seat",
                    award: "$20",
                    helper: undefined,
                    complete: false
                },
                {
                    id: 2,
                    requester: "abc@saveaspot.com",
                    time: "2021-09-01 17:00",
                    location: "UBC Math 101 any seat",
                    award: "$5",
                    helper: "def@saveaspot.com",
                    complete: true
                },
                {
                    id: 3,
                    requester: "abc@saveaspot.com",
                    time: "2021-07-01 14:00",
                    location: "UBC DMP 100 1st row any seat",
                    award: "$100",
                    helper: undefined,
                    complete: false
                }
            ],
            user: request.session.userId
        })
    }

})


app.get('/login_test', (request, response) => {
    if (request.session.userId === undefined) {
        response.status(403).json({ result: "you need to log in !" })
    } else {
        response.status(200).json({ result: "successful login test" });
    }
});





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log("hello");
})