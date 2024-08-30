const mongoose = require("mongoose");

const init = () => {
  mongoose.connect(process.env.DATABASE_URL);
};

module.exports = { init };
