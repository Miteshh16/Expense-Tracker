const User = require("../models/User");
const Expense = require("../models/Expense");
const xlsx = require("xlsx");
const path = require("path");

// ✅ Add Expense
exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// ✅ Get All Expenses
exports.getAllExpense = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ message: "Error fetching expenses", error: err.message });
    }
};

// ✅ Delete Expense
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting expense", error: err.message });
    }
};

// ✅ Download Expense Excel
exports. downloadExpenseExcel= async (req, res) => {
    const userId = req.user.id;
    
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");

        // Save file in a temporary directory
        const filePath = path.join(__dirname, "../uploads/expense_details.xlsx");
        xlsx.writeFile(wb, filePath);

        // Send the file as a download
        res.download(filePath, "expense_details.xlsx", (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).json({ message: "Error downloading file" });
            }
        });
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ message: "Server Error" });
    }
};
