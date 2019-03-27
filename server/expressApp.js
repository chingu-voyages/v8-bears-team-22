import express from "express";
import cors from "cors";
import path from "path";
import {ApolloServer} from "apollo-server-express";
import {typeDefs, resolvers} from "./graphql-schema";
import bodyParser from 'body-parser'

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));


const expressApp = db => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: {db}
    });

    server.applyMiddleware({app});

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../build/index.html"));
    });

    router.get("/", (req, res) => {
        res.json({message: "Hello"});
    });

    router.post('/account/login', (req, res) => {
        console.log(req.body);
        res.json({
            result: isValidCredentials(req.body)
        })
    });

    function isValidCredentials(payloadCreds) {
        // TODO fetch credentials from DB
        const validCredentials = {email: "test@email.com", password: "password"};
        console.log(payloadCreds);
        const isValidCreds = payloadCreds.email === validCredentials.email
            && payloadCreds.password === validCredentials.password;
        console.log('isValidCreds', isValidCreds);
        return isValidCreds;
    }

    router.get("/db", (req, res) => {
        db.messages.find({}).toArray(function (err, docs) {
            if (err) return err;
            console.log(docs);
        });
        res.redirect("/api");
    });

    return app;
};

export default expressApp;
