const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Enable CORS

app.get("/sum", (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    const result = a + b;
    res.json({
        sum: result
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});