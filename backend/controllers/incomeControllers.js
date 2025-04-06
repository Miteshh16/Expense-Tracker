const User = require("../models/User");
const Income = require("../models/Income");
const xlsx=require('xlsx')
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
            income: amount, // ✅ FIXED
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
    try {
        const incomes = await Income.find({ userId: req.user.id }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching incomes", error: err.message });
    }
};

// ✅ Delete Income
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        // if (!income) {
        //     return res.status(404).json({ message: "Income not found" });
        // }

        // if (income.userId.toString() !== req.user.id) {
        //     return res.status(403).json({ message: "Not authorized" });
        // }

       
        res.json({ message: "Income deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting income", error: err.message });
    }
};

// ✅ Placeholder for Download Income Excel (Implementation needed)
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.income,  // Fix: Use 'income' instead of 'amount'
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Save file in a temporary directory
        const filePath = path.join(__dirname, "../uploads/income_details.xlsx");
        xlsx.writeFile(wb, filePath);

        // Send the file as a download
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
