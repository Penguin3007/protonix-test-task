const mongoose = require("mongoose");
const { Schema } = mongoose;

const FavoriteSymbolSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  symbolId: { type: mongoose.Schema.Types.ObjectId, ref: "symbol" },
});

module.exports = mongoose.model("favorite_symbol", FavoriteSymbolSchema);
