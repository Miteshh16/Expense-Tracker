const User = require("../models/User");
const Income = require("../models/Income");
const xlsx = require("xlsx");
const path = require("path");

// ✅ Add Income
exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount, // ✅ fixed: previously was income: amount
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// ✅ Get All Income
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching incomes", error: err.message });
    }
};

// ✅ Delete Income
exports.deleteIncome = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id);

        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        if (income.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting income", error: err.message });
    }
};

// ✅ Download Income Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount, // ✅ fixed: was item.income
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        const filePath = path.join(__dirname, "../uploads/income_details.xlsx");
        xlsx.writeFile(wb, filePath);

        res.download(filePath, "income_details.xlsx", (err) => {
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