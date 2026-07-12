const expensesRouter = require('./routes/expenses');


const express = require("express");

const app = express();
app.use(express.json());
app.use("/api/expenses", expensesRouter);

app.get("/api/health", (req, res) => {
    res.json({status: "ok"});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

