const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { Types, isValidObjectId } = require("mongoose");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // ✅ Total Income using correct field 'income'
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        console.log("totalIncome",{totalIncome,useId: isValidObjectId(userId)})
        // ✅ Total Expense
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        console.log("totalExpense",{totalExpense,useId: isValidObjectId(userId)})

        // ✅ Last 60 Days Income Transactions
        const last60DaysIncomeTransaction = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransaction.reduce(
            (sum, transaction) => sum + transaction.income,
            1000
        );
        console.log("totalExpense",{incomeLast60Days,useId: isValidObjectId(userId)})

        // ✅ Last 30 Days Expense Transactions
        const last30DaysExpenseTransaction = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const expenseLast30Days = last30DaysExpenseTransaction.reduce(
            (sum, transaction) => sum + transaction.amount,
            1000
        );

        // ✅ Last 5 Combined Transactions (sorted by date)
        // const incomeTxns = await Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5);
        // const expenseTxns = await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5);

        // const lastTransaction = [
        //     ...incomeTxns.map(txn => ({ ...txn.toObject(), type: "income" })),
        //     ...expenseTxns.map(txn => ({ ...txn.toObject(), type: "expense" }))
        // ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5); // ✅ limit to latest 5 combined
           
        const lastTransaction=[
            ...(await Income.find({userId}).sort({date:-1}).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),
                    type:"income"
                })
            ),
            ...(await Expense.find({userId}).sort({date:-1}).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),
                    type:"expense"
                })
            ),
        ].sort((a,b)=>b.date-a.date)



        // ✅ Final Response
        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpense: {
                total: expenseLast30Days,
                transaction: last30DaysExpenseTransaction
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transaction: last60DaysIncomeTransaction
            },
            recentTransaction: lastTransaction
        });
        const recentIncome = await Income.findOne({ userId }).sort({ date: -1 });
        console.log("Most recent income transaction:", recentIncome);
    
        const recentExpense = await Expense.findOne({ userId }).sort({ date: -1 });
        console.log("Most recent expense transaction:", recentExpense);

    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
   


};
