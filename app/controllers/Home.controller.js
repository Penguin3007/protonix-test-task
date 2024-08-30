const { Symbol, User, FavoriteSymbol } = require("../models");
const requestify = require("requestify");

const renderHome = async (req, res) => {
  const symbols = await Symbol.find();

  const favoriteSymbols = await FavoriteSymbol.find({ userId: req.user.id })
                                              .populate("symbolId")
                                              .exec();

  const favoriteSymbolIds = new Set(favoriteSymbols.map(fav => fav.symbolId._id.toString()));

  const symbolListWithFavorites = symbols.map(symbol => {
    return {
      id: symbol.id,
      symbol: symbol.symbol,
      askPrice: (symbol.price + (symbol.price * 0.05)).toFixed(6),
      bidPrice: (symbol.price - (symbol.price * 0.05)).toFixed(6),
      isFavorite: favoriteSymbolIds.has(symbol._id.toString()),
    };
  });

  symbolListWithFavorites.sort((a, b) => b.isFavorite - a.isFavorite);

  res.render("home", { symbols: symbolListWithFavorites });
};

const initialMigrate = async (_req, res) => {
  await FavoriteSymbol.deleteMany();
  await User.deleteMany();
  await User.create({ email: "test@test.com" });

  const response = await requestify.get("https://testnet.binancefuture.com/fapi/v1/ticker/price");
  if (response.code === 200) {
    const body = response.getBody();
    await Symbol.deleteMany();
    await Symbol.insertMany(body);
  }
  res.send("Initial migration");
};

module.exports = { renderHome, initialMigrate };
