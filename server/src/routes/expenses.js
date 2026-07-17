const express = require('express');
const { getAllExpenses, createExpense, deleteExpense}= require('../controllers/expensesController');
const router = express.Router();

router.get('/', getAllExpenses);
router.post('/', createExpense);
router.delete('/:id', deleteExpense);

module.exports = router;