const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  define : {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
  timezone: '-03:00',
};