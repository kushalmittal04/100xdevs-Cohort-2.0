const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Enable CORS

// localhost:3000/sum?a=1&b=2
app.get("/sum", (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    const result = a + b;
    res.send(result.toString());
});

// localhost:3000/intrest?principal=1000&rate=5&time=2
app.get("/intrest", (req, res) => {
    const principal = parseInt(req.query.principal);
    const rate = parseFloat(req.query.rate);
    const time = parseInt(req.query.time);
    
    const intrest = (principal * rate * time)/100;
    const total = principal + intrest;
    
    res.json({
        intrest: intrest,
        total: total
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});