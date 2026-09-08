const express = require("express");

const app = express();

app.use(express.json());

app.post("/tester", (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
})

app.listen(4000, () => {
    console.log("Server is running on port: 4000");
})