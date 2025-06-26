const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: "db.kkibrfyyakncebbgbvfd.supabase.co",
  port: 5432,
  ssl: true,
  family: 4,
});

module.exports = pool;
