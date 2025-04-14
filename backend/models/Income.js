const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        icon: { type: String },
        source: { type: String, required: true, trim: true },
        amount: { type: Number, required: true }, // ✅ must be `amount`
        date: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Income", IncomeSchema);
