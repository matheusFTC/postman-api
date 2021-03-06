let bodyParser = require("body-parser");
let cors = require("cors");
let express = require("express");
let sendmail = require("sendmail");
let nodemailer = require("nodemailer");

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.disable("x-powered-by");

app.post("/", (req, res) => {
    let options = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html
    };

    if (((req.body.host && req.body.port) || req.body.service) && req.body.user && req.body.pass) {
        let transporter;

        if (req.body.service) {
            transporter = nodemailer.createTransport({
                service: req.body.service,
                auth: {
                    user: req.body.user,
                    pass: req.body.pass
                }
            });
        } else {
            transporter = nodemailer.createTransport({
                host: req.body.host,
                port: req.body.port,
                secure: true,
                auth: {
                    user: req.body.user,
                    pass: req.body.pass
                }
            });
        }

        transporter.sendMail(options, (error, info) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(info);
            }
        });
    } else {
        let mail = sendmail({ silent: true });

        mail(options, (error) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({ message: "Email successfully sent." });
            }
        });
    }
});

app.use((req, res, next) => {
    res.status(404).json({ error: "Resource not found." });
});

app.use((err, req, res, next) => {
    res.status(500).json({ error: "Internal server error." });
});

app.listen(process.env.PORT || 80);