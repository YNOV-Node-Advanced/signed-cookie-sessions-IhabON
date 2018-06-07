const express = require('express');
const crypto = require('crypto');
const app = express();
const sessionStore = {};

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const PORT = process.env.PORT|| 5001;

const value = "9999";
const privateKey= "la_cle_privee";

const USERS = [
    {
        username: "John",
        password: "1234",
        
        
    }
];



const signature = hash(value, privateKey);
const cookieValue = JSON.stringify({
    value,
    signature
})

// fonction connexion
function authentification(req, res, next) {
    var data = (request.get('authorization') || ':').replace('Basic ', '');
    data = Buffer.from(data, 'base64').toString().split(':', 2);
    var user = {
        name: data[0],
        password: data[1] || ''
    };
    return user;
}
// gestion des cookies
app.use(cookieParser());
app.use((request, response, next) => {
    let session = request.cookies[COOKIE_KEY];
    if (session != undefined) {
        session = JSON.parse(session);
        //verification signature
        if(hashCookie(session.user) !== session.signature) {
            return response.status(401).send('Access denied');
        } else {
            request.session = session;
            return next();
        }
    }
    //gestion des logins
    var user = auth(request);
    if (!user || !users[user.name] || users[user.name] !== user.password) {
        response.set('WWW-Authenticate', 'Basic realm="Vos identifiants"');
        return response.status(401).send('Access denied');
    }
    //on récupére les info de la session
    request.session = {
        user: user.name,
        signature: hashCookie(user.name)
    };
    //on récup les cookies
    response.cookie(COOKIE_KEY, JSON.stringify(request.session), { expires: new Date(Date.now() + 3600 * 24 * 365), httpOnly });
    return next();
});

app.use(authentification);

app.get("/", function(req, res) {
    res.send("Hello World " + loggedUser.username);
});

app.listen(PORT, () =>
    console.log("Server listening on http://localhost:" + PORT)
);