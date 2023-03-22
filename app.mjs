import bodyParser from "body-parser";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import { default as connectMongoDBSession } from 'connect-mongodb-session';

import adminRoute from "./routes/admin.mjs";
import authRoute from "./routes/auth.mjs";
import clientRoute from "./routes/client.mjs";
import errorRoute from "./routes/error.mjs";

import Member from "./models/member.mjs";

//const MONGODB_URI = "mongodb://127.0.0.1:27017/srmteamrobocon?retryWrites=true&w=majority";
//const PORT = null;

const app = express();
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
    uri: MONGO_URI,
    collection: "sessions",
})

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(path.resolve(),"public")));
app.use(session({
    secret: 'Some_Encrytped_Text', 
    resave: false, 
    saveUninitialized: false, 
    store: store,
}));

app.use((request, respond, next) => {
    if(!request.session.admin) return next();
    Member.findById(request.session.admin._id)
    .then(admin => {
        request.admin = admin;
        next();
    })
    .catch(e => console.log(e));
});
app.use((request, respond, next) => {
    respond.locals.isAuthenticated = request.session.isAuthenticated;
    respond.locals.admin = request.admin;
    next();
})
app.use("/admin", adminRoute);
app.use(authRoute);
app.use(clientRoute);
app.use(errorRoute);

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Database Connected !");
    app.listen(PORT || 3000);
})
.catch(e => console.log(e));
