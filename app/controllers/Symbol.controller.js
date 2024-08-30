const { FavoriteSymbol } = require("../models");
const mongoose = require("mongoose");

exports.addToFavorite = async (req, res) => {
  if (!req.body.symbolId) {
    res.status(403).json({ message: "Symbol ID is required" });
    return;
  }

  const userId = new mongoose.Types.ObjectId(req.user.id);
  const symbolId = new mongoose.Types.ObjectId(req.body.symbolId);

  const favoriteSymbolsCount = await FavoriteSymbol.countDocuments({ userId, symbolId });
  if (!favoriteSymbolsCount) {
    await FavoriteSymbol.create({
      userId,
      symbolId,
    });
    res.json({ message: "Added to favorite" });
  } else {
    await FavoriteSymbol.deleteOne({
      userId,
      symbolId,
    });
    res.json({ message: "Deleted from favorite" });
  }
};
