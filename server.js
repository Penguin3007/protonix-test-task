const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const database = require("./app/database");
const { publicRoutes } = require("./app/routes");
const { User } = require("./app/models");

dotenv.config();
database.init();

const app = express();

const hbs = expressHandlebars.create({
  helpers: {
    publicPath () { return `${__dirname}/app/public`; },
  },
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/app/views`);

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/app/public/`));

app.use(async (req, res, next) => {
  req.user = await User.findOne({ email: "test@test.com" });
  next();
});

app.use("/", publicRoutes);

app.listen(process.env.PORT);
