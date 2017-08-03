let bodyParser = require("body-parser");
let cors = require("cors");
let express = require("express");
let sendmail = require("sendmail");

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.disable("x-powered-by");

app.post("/", function (req, res) {
    let mail = sendmail({silent: true});

    let options = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };

    mail(options, function (error) {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).end();
        }
    });
});

app.use(function (req, res, next) {
    res.status(404).json({ error: "Resource not found." });
});

app.use(function (err, req, res, next) {
    res.status(500).json({ error: "Internal server error." });
});

app.set("port", process.env.PORT || 80);

app.listen(app.get("port"), function () {
    console.log("Application started.");
});