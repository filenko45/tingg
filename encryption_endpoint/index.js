const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Checkout = require("./checkout");

const PORT = 8000;
const secret = "8gfGxtrMcJpWRTN2";
const IV = "djmt3P7hB8QwNXzy";
const accessKey = "$2a$08$nXC./aX0OwofaVxVZMQDXeQogCGbYI0dh/EL08ecRi1g8vHms50W6";

const checkout = new Checkout(secret, IV);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/encrypt", (req, res) => {
    res.send({
        'params':checkout.encrypt(req.body),
        'accessKey':accessKey,
        'countryCode':req.body.countryCode
       });
});

app.post("/fail", (req, res) => {
    console.log("Fail, POST", req.body)
    res.send(req.body);
});

app.post("/success", (req, res) => {
    console.log("Success, POST", req.body)
    res.send(req.body);
});

app.listen(PORT, () => console.log(`Listening on ${PORT} port`));