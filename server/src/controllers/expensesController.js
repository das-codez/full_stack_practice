

// let expenses = [
//     { id: 1, description: 'Groceries', amount: 42.5, category: 'Food', date: '2026-07-11' },
// ];
// let nextId = 2;

// function getAllExpenses(req, res){
//     res.json(expenses);
// }

// function createExpense(req, res){
//     const { description, amount, category, date } = req.body;
//     if (!description || amount === undefined) {
//         return res.status(400).json({ error: 'Description and amount are required' });
//     }

//     const expense = { id: nextId++, description, amount, category, date };
//     expenses.push(expense);
//     res.status(201).json(expense);
// }

// module.exports = {
//     getAllExpenses,
//     createExpense
// };

const pool = require('../db');

async function getAllExpenses(req, res){
    try {
        const result = await pool.query('SELECT * FROM expenses');
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }


}

async function createExpense(req, res){
    const { description, amount, category, date } = req.body;
    if (!description || amount === undefined) {
        return res.status(400).json({ error: 'Description and amount are required' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO expenses (description, amount, category, date) 
            VALUES ($1, $2, $3, COALESCE($4::date, CURRENT_DATE))
            RETURNING *`, 
        [description, amount, category, date]
        );
        res.status(201).json(result.rows[0]);
    }catch (err) {
        console.log(err);
        res.status(501).json({error: 'Internal Server Error'});
    }


}

async function deleteExpense(req, res) {

    const {id } = req.params;

    if (!id){
        return res.status(400).json({error: 'id required'});
    }

    try {
        const result = await pool.query(
            'DELETE FROM expenses WHERE id = $1',
            [id]
        );
        if (result.rowCount === 0){
            return res.status(404).json({error : "expense not found"});
        }
        res.status(204).send("Deleted");

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
}

module.exports = { getAllExpenses, createExpense, deleteExpense};