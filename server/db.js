const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

// sequelize
//   .authenticate()
//   .then(() => console.log("postgres database is connected"))
//   .catch((err) => console.log(err));

sequelize.authenticate().then(
  function () {
    console.log("connected to the server");
  },
  function (err) {
    console.log(err);
  }
);

User = sequelize.import("./models/user");
Logs = sequelize.import("./models/log");
UserInfo = sequelize.import("./models/userInfo");

Logs.belongsTo(User);
User.hasMany(Logs);
// i think this is what we have to do for the lotto app, to lazy to do on the actual table
//Destinations = sequelize.import("./models/destination")
//userLotto = sequelize.import("./models/userLotto")
//Destinations.belongsTo(userLotto)
//userLotto.hasMany(Destinations)
User.hasOne(UserInfo);
UserInfo.belongsTo(User);

module.exports = sequelize;
