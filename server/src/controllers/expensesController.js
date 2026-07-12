

let expenses = [
    { id: 1, description: 'Groceries', amount: 42.5, category: 'Food', date: '2026-07-11' },
];
let nextId = 2;

function getAllExpenses(req, res){
    res.json(expenses);
}

function createExpense(req, res){
    const { description, amount, category, date } = req.body;
    if (!description || amount === undefined) {
        return res.status(400).json({ error: 'Description and amount are required' });
    }

    const expense = { id: nextId++, description, amount, category, date };
    expenses.push(expense);
    res.status(201).json(expense);
}

module.exports = {
    getAllExpenses,
    createExpense
};

