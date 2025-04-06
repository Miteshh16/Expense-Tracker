const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        icon: { type: String },
        source: { type: String, required: true, trim: true },
        income: { type: Number, required: true }, // ✅ Changed from String to Number
        date: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Income", IncomeSchema);
