const mongoose = require("mongoose");
const { Schema } = mongoose;

const SymbolSchema = new Schema({
  symbol: String,
  price: Number,
});

module.exports = mongoose.model("symbol", SymbolSchema);
